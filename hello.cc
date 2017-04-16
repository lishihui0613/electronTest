#include <node.h>
#include <uv.h>
#include <iostream>
#include <Windows.h>
#include "UsbDevInterface.h"

namespace demo {

using v8::Exception;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::Number;
using v8::Function;
using v8::Context;
using v8::Persistent;
using v8::Null;
using v8::HandleScope;
using v8::Handle;
using v8::FunctionTemplate;

// 数据回调地址存储
static Persistent < Function > constructor;

// 设置接收数据回调地址
void setDataCallback(const FunctionCallbackInfo<Value>& args) {
     Isolate* isolate = args.GetIsolate();
	if (args.Length() < 1 || !args[0]->IsFunction() ) {
		//isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Invalid parameter.")));
         args.GetReturnValue().Set(String::NewFromUtf8(isolate, "Invalid parameter"));
        return;
	}

  Isolate* isolate1 = Isolate::GetCurrent();
  HandleScope scope(isolate1);

  Local<Function> cb = Local<Function>::New(isolate1, Local<Function>::Cast(args[0]));
  constructor.Reset(isolate1, cb);
   args.GetReturnValue().Set(String::NewFromUtf8(isolate, "setDataCallback success"));
}

// 用于通知主线程发送数据消息
static uv_async_t s_async = {0};

// 解析原始数据
bool gParseUsbData(char* dest, const unsigned char* src, const sPenInfo& penInfo, int len)
{
	if(len > 320)
		return false;

	char* pTemp = dest;
	for (int i = 0; i < len; i++)
	{
		sprintf(dest, "%02X ", src[i]);
		dest += 3;
	}
    // sprintf(dest,"%d,%d,%d\n",penInfo.nX,penInfo.nY,penInfo.nPenP);
	dest = pTemp;
	return true;
}

// c++动态库数据回调地址
static void __stdcall dataCb (const unsigned char* pUsbData, const sPenInfo& penInfo, void* context)
{
    char* pTemp = new char[64];
    memset(pTemp, 0, 64);
	gParseUsbData(pTemp, pUsbData, penInfo, 8);
    s_async.data = (void*)pTemp;
    uv_async_send(&s_async);  // 通知主线程发送数据
    return;
}

// 打开设备
void openDevice(const FunctionCallbackInfo<Value>& args) {
     
    Isolate* isolate = args.GetIsolate();
    // 判断形参的合法性
   if (args.Length() < 2) {
    // Throw an Error that is passed back to JavaScript
    isolate->ThrowException(Exception::TypeError( String::NewFromUtf8(isolate, "Wrong number of arguments")));
    return;
  }

  // 检查形参类型
  if (!args[0]->IsNumber())
  {
      isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "args[0] Wrong arguments")));
      return;
  }

  if (!args[1]->IsNumber()) 
  {
      isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "args[1] Wrong arguments")));
      return;
  }
  //Local < Function > cb = Local < Function > ::Cast(args[2]);
  //cb - >Call(Null(isolate), argc, argv);
  HINSTANCE hDLL;
  hDLL=LoadLibraryA("usbDevModule.dll"); //加载动态链接库usbDevModule.dll文件；
  typedef bool (*pOpenDevAd) (char* p[], unsigned int, usbDataCallBack);  //函数指针
  pOpenDevAd openDev = NULL;
  openDev = (pOpenDevAd)GetProcAddress(hDLL,"_extern_openSpecUsbDevByPid");

  if(openDev == NULL)
  {
    args.GetReturnValue().Set(String::NewFromUtf8(isolate, "getProcess Error"));
    return;
  }
  else
  {
      // 调用回调
      char* arry[] = {"7806"};   // 此处ID为板子PID
      int nSize = args[1]->Uint32Value();
      usbDataCallBack callback = dataCb;
      bool bRes = openDev( arry, nSize, callback);
      DWORD dwErr = ::GetLastError();
      args.GetReturnValue().Set(Number::New(isolate, dwErr));
  }
}

void onCallback(uv_async_t* handle){  
        if (!constructor.IsEmpty())
        {
            Isolate* isolate1 = Isolate::GetCurrent();
            HandleScope scope(isolate1);
            const unsigned argc = 2;
	         Local<Value> argv[argc] = { 
		     Local<Value>::New(isolate1, Number::New(isolate1, 1111)) ,
             Local<Value>::New(isolate1, String::NewFromUtf8(isolate1, (char *)handle->data)) 
	         };
            Local<Function> cons = Local<Function>::New(isolate1, constructor);
            cons->Call(Null(isolate1), argc, argv);
            delete handle->data;
        }
}

void init(Local<Object> exports) {

    uv_async_init( uv_default_loop(), &s_async, onCallback);  
    NODE_SET_METHOD(exports, "openDevice", openDevice);
    NODE_SET_METHOD(exports, "setCallBack", setDataCallback);
}

NODE_MODULE(addon, init)
}