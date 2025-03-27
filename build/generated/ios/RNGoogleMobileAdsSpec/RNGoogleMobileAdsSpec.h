/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleObjCpp
 *
 * We create an umbrella header (and corresponding implementation) here since
 * Cxx compilation in BUCK has a limitation: source-code producing genrule()s
 * must have a single output. More files => more genrule()s => slower builds.
 */

#ifndef __cplusplus
#error This file must be compiled as Obj-C++. If you are importing it, you must change your file extension to .mm.
#endif

// Avoid multiple includes of RNGoogleMobileAdsSpec symbols
#ifndef RNGoogleMobileAdsSpec_H
#define RNGoogleMobileAdsSpec_H

#import <Foundation/Foundation.h>
#import <RCTRequired/RCTRequired.h>
#import <RCTTypeSafety/RCTConvertHelpers.h>
#import <RCTTypeSafety/RCTTypedModuleConstants.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTCxxConvert.h>
#import <React/RCTManagedPointer.h>
#import <ReactCommon/RCTTurboModule.h>
#import <optional>
#import <vector>


@protocol NativeAppOpenModuleSpec <RCTBridgeModule, RCTTurboModule>

- (void)appOpenLoad:(double)requestId
           adUnitId:(NSString *)adUnitId
     requestOptions:(NSDictionary *)requestOptions;
- (void)appOpenShow:(double)requestId
           adUnitId:(NSString *)adUnitId
        showOptions:(NSDictionary *)showOptions
            resolve:(RCTPromiseResolveBlock)resolve
             reject:(RCTPromiseRejectBlock)reject;

@end

@interface NativeAppOpenModuleSpecBase : NSObject {
@protected
facebook::react::EventEmitterCallback _eventEmitterCallback;
}
- (void)setEventEmitterCallback:(EventEmitterCallbackWrapper *)eventEmitterCallbackWrapper;


@end

namespace facebook::react {
  /**
   * ObjC++ class for module 'NativeAppOpenModule'
   */
  class JSI_EXPORT NativeAppOpenModuleSpecJSI : public ObjCTurboModule {
  public:
    NativeAppOpenModuleSpecJSI(const ObjCTurboModule::InitParams &params);
  };
} // namespace facebook::react
namespace JS {
  namespace NativeConsentModule {
    struct AdsConsentInfoOptions {
      std::optional<double> debugGeography() const;
      std::optional<bool> tagForUnderAgeOfConsent() const;
      std::optional<facebook::react::LazyVector<NSString *>> testDeviceIdentifiers() const;

      AdsConsentInfoOptions(NSDictionary *const v) : _v(v) {}
    private:
      NSDictionary *_v;
    };
  }
}

@interface RCTCxxConvert (NativeConsentModule_AdsConsentInfoOptions)
+ (RCTManagedPointer *)JS_NativeConsentModule_AdsConsentInfoOptions:(id)json;
@end
@protocol NativeConsentModuleSpec <RCTBridgeModule, RCTTurboModule>

- (void)requestInfoUpdate:(JS::NativeConsentModule::AdsConsentInfoOptions &)options
                  resolve:(RCTPromiseResolveBlock)resolve
                   reject:(RCTPromiseRejectBlock)reject;
- (void)showForm:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject;
- (void)showPrivacyOptionsForm:(RCTPromiseResolveBlock)resolve
                        reject:(RCTPromiseRejectBlock)reject;
- (void)loadAndShowConsentFormIfRequired:(RCTPromiseResolveBlock)resolve
                                  reject:(RCTPromiseRejectBlock)reject;
- (void)getConsentInfo:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject;
- (void)getTCString:(RCTPromiseResolveBlock)resolve
             reject:(RCTPromiseRejectBlock)reject;
- (void)getGdprApplies:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject;
- (void)getPurposeConsents:(RCTPromiseResolveBlock)resolve
                    reject:(RCTPromiseRejectBlock)reject;
- (void)getPurposeLegitimateInterests:(RCTPromiseResolveBlock)resolve
                               reject:(RCTPromiseRejectBlock)reject;
- (void)reset;

@end

@interface NativeConsentModuleSpecBase : NSObject {
@protected
facebook::react::EventEmitterCallback _eventEmitterCallback;
}
- (void)setEventEmitterCallback:(EventEmitterCallbackWrapper *)eventEmitterCallbackWrapper;


@end

namespace facebook::react {
  /**
   * ObjC++ class for module 'NativeConsentModule'
   */
  class JSI_EXPORT NativeConsentModuleSpecJSI : public ObjCTurboModule {
  public:
    NativeConsentModuleSpecJSI(const ObjCTurboModule::InitParams &params);
  };
} // namespace facebook::react
namespace JS {
  namespace NativeGoogleMobileAdsModule {
    struct Constants {

      struct Builder {
        struct Input {
          RCTRequired<double> REVENUE_PRECISION_ESTIMATED;
          RCTRequired<double> REVENUE_PRECISION_PRECISE;
          RCTRequired<double> REVENUE_PRECISION_PUBLISHER_PROVIDED;
          RCTRequired<double> REVENUE_PRECISION_UNKNOWN;
        };

        /** Initialize with a set of values */
        Builder(const Input i);
        /** Initialize with an existing Constants */
        Builder(Constants i);
        /** Builds the object. Generally used only by the infrastructure. */
        NSDictionary *buildUnsafeRawValue() const { return _factory(); };
      private:
        NSDictionary *(^_factory)(void);
      };

      static Constants fromUnsafeRawValue(NSDictionary *const v) { return {v}; }
      NSDictionary *unsafeRawValue() const { return _v; }
    private:
      Constants(NSDictionary *const v) : _v(v) {}
      NSDictionary *_v;
    };
  }
}
@protocol NativeGoogleMobileAdsModuleSpec <RCTBridgeModule, RCTTurboModule>

- (void)initialize:(RCTPromiseResolveBlock)resolve
            reject:(RCTPromiseRejectBlock)reject;
- (void)setRequestConfiguration:(NSDictionary *)requestConfiguration
                        resolve:(RCTPromiseResolveBlock)resolve
                         reject:(RCTPromiseRejectBlock)reject;
- (void)openAdInspector:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject;
- (void)openDebugMenu:(NSString *)adUnit;
- (void)setAppVolume:(double)volume;
- (void)setAppMuted:(BOOL)muted;
- (facebook::react::ModuleConstants<JS::NativeGoogleMobileAdsModule::Constants::Builder>)constantsToExport;
- (facebook::react::ModuleConstants<JS::NativeGoogleMobileAdsModule::Constants::Builder>)getConstants;

@end

@interface NativeGoogleMobileAdsModuleSpecBase : NSObject {
@protected
facebook::react::EventEmitterCallback _eventEmitterCallback;
}
- (void)setEventEmitterCallback:(EventEmitterCallbackWrapper *)eventEmitterCallbackWrapper;


@end

namespace facebook::react {
  /**
   * ObjC++ class for module 'NativeGoogleMobileAdsModule'
   */
  class JSI_EXPORT NativeGoogleMobileAdsModuleSpecJSI : public ObjCTurboModule {
  public:
    NativeGoogleMobileAdsModuleSpecJSI(const ObjCTurboModule::InitParams &params);
  };
} // namespace facebook::react

@protocol NativeGoogleMobileAdsNativeModuleSpec <RCTBridgeModule, RCTTurboModule>

- (void)load:(NSString *)adUnitId
requestOptions:(NSDictionary *)requestOptions
     resolve:(RCTPromiseResolveBlock)resolve
      reject:(RCTPromiseRejectBlock)reject;
- (void)destroy:(NSString *)responseId;

@end

@interface NativeGoogleMobileAdsNativeModuleSpecBase : NSObject {
@protected
facebook::react::EventEmitterCallback _eventEmitterCallback;
}
- (void)setEventEmitterCallback:(EventEmitterCallbackWrapper *)eventEmitterCallbackWrapper;

- (void)emitOnAdEvent:(NSDictionary *)value;
@end

namespace facebook::react {
  /**
   * ObjC++ class for module 'NativeGoogleMobileAdsNativeModule'
   */
  class JSI_EXPORT NativeGoogleMobileAdsNativeModuleSpecJSI : public ObjCTurboModule {
  public:
    NativeGoogleMobileAdsNativeModuleSpecJSI(const ObjCTurboModule::InitParams &params);
  };
} // namespace facebook::react

@protocol NativeInterstitialModuleSpec <RCTBridgeModule, RCTTurboModule>

- (void)interstitialLoad:(double)requestId
                adUnitId:(NSString *)adUnitId
          requestOptions:(NSDictionary *)requestOptions;
- (void)interstitialShow:(double)requestId
                adUnitId:(NSString *)adUnitId
             showOptions:(NSDictionary *)showOptions
                 resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject;

@end

@interface NativeInterstitialModuleSpecBase : NSObject {
@protected
facebook::react::EventEmitterCallback _eventEmitterCallback;
}
- (void)setEventEmitterCallback:(EventEmitterCallbackWrapper *)eventEmitterCallbackWrapper;


@end

namespace facebook::react {
  /**
   * ObjC++ class for module 'NativeInterstitialModule'
   */
  class JSI_EXPORT NativeInterstitialModuleSpecJSI : public ObjCTurboModule {
  public:
    NativeInterstitialModuleSpecJSI(const ObjCTurboModule::InitParams &params);
  };
} // namespace facebook::react

@protocol NativeRewardedInterstitialModuleSpec <RCTBridgeModule, RCTTurboModule>

- (void)rewardedInterstitialLoad:(double)requestId
                        adUnitId:(NSString *)adUnitId
                  requestOptions:(NSDictionary *)requestOptions;
- (void)rewardedInterstitialShow:(double)requestId
                        adUnitId:(NSString *)adUnitId
                     showOptions:(NSDictionary *)showOptions
                         resolve:(RCTPromiseResolveBlock)resolve
                          reject:(RCTPromiseRejectBlock)reject;

@end

@interface NativeRewardedInterstitialModuleSpecBase : NSObject {
@protected
facebook::react::EventEmitterCallback _eventEmitterCallback;
}
- (void)setEventEmitterCallback:(EventEmitterCallbackWrapper *)eventEmitterCallbackWrapper;


@end

namespace facebook::react {
  /**
   * ObjC++ class for module 'NativeRewardedInterstitialModule'
   */
  class JSI_EXPORT NativeRewardedInterstitialModuleSpecJSI : public ObjCTurboModule {
  public:
    NativeRewardedInterstitialModuleSpecJSI(const ObjCTurboModule::InitParams &params);
  };
} // namespace facebook::react

@protocol NativeRewardedModuleSpec <RCTBridgeModule, RCTTurboModule>

- (void)rewardedLoad:(double)requestId
            adUnitId:(NSString *)adUnitId
      requestOptions:(NSDictionary *)requestOptions;
- (void)rewardedShow:(double)requestId
            adUnitId:(NSString *)adUnitId
         showOptions:(NSDictionary *)showOptions
             resolve:(RCTPromiseResolveBlock)resolve
              reject:(RCTPromiseRejectBlock)reject;

@end

@interface NativeRewardedModuleSpecBase : NSObject {
@protected
facebook::react::EventEmitterCallback _eventEmitterCallback;
}
- (void)setEventEmitterCallback:(EventEmitterCallbackWrapper *)eventEmitterCallbackWrapper;


@end

namespace facebook::react {
  /**
   * ObjC++ class for module 'NativeRewardedModule'
   */
  class JSI_EXPORT NativeRewardedModuleSpecJSI : public ObjCTurboModule {
  public:
    NativeRewardedModuleSpecJSI(const ObjCTurboModule::InitParams &params);
  };
} // namespace facebook::react

inline std::optional<double> JS::NativeConsentModule::AdsConsentInfoOptions::debugGeography() const
{
  id const p = _v[@"debugGeography"];
  return RCTBridgingToOptionalDouble(p);
}
inline std::optional<bool> JS::NativeConsentModule::AdsConsentInfoOptions::tagForUnderAgeOfConsent() const
{
  id const p = _v[@"tagForUnderAgeOfConsent"];
  return RCTBridgingToOptionalBool(p);
}
inline std::optional<facebook::react::LazyVector<NSString *>> JS::NativeConsentModule::AdsConsentInfoOptions::testDeviceIdentifiers() const
{
  id const p = _v[@"testDeviceIdentifiers"];
  return RCTBridgingToOptionalVec(p, ^NSString *(id itemValue_0) { return RCTBridgingToString(itemValue_0); });
}
inline JS::NativeGoogleMobileAdsModule::Constants::Builder::Builder(const Input i) : _factory(^{
  NSMutableDictionary *d = [NSMutableDictionary new];
  auto REVENUE_PRECISION_ESTIMATED = i.REVENUE_PRECISION_ESTIMATED.get();
  d[@"REVENUE_PRECISION_ESTIMATED"] = @(REVENUE_PRECISION_ESTIMATED);
  auto REVENUE_PRECISION_PRECISE = i.REVENUE_PRECISION_PRECISE.get();
  d[@"REVENUE_PRECISION_PRECISE"] = @(REVENUE_PRECISION_PRECISE);
  auto REVENUE_PRECISION_PUBLISHER_PROVIDED = i.REVENUE_PRECISION_PUBLISHER_PROVIDED.get();
  d[@"REVENUE_PRECISION_PUBLISHER_PROVIDED"] = @(REVENUE_PRECISION_PUBLISHER_PROVIDED);
  auto REVENUE_PRECISION_UNKNOWN = i.REVENUE_PRECISION_UNKNOWN.get();
  d[@"REVENUE_PRECISION_UNKNOWN"] = @(REVENUE_PRECISION_UNKNOWN);
  return d;
}) {}
inline JS::NativeGoogleMobileAdsModule::Constants::Builder::Builder(Constants i) : _factory(^{
  return i.unsafeRawValue();
}) {}




#endif // RNGoogleMobileAdsSpec_H
