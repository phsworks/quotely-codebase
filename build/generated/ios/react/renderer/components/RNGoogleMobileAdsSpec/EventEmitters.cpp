
/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateEventEmitterCpp.js
 */

#include <react/renderer/components/RNGoogleMobileAdsSpec/EventEmitters.h>


namespace facebook::react {

void RNGoogleMobileAdsBannerViewEventEmitter::onNativeEvent(OnNativeEvent $event) const {
  dispatchEvent("nativeEvent", [$event=std::move($event)](jsi::Runtime &runtime) {
    auto $payload = jsi::Object(runtime);
    $payload.setProperty(runtime, "type", $event.type);
$payload.setProperty(runtime, "width", $event.width);
$payload.setProperty(runtime, "height", $event.height);
$payload.setProperty(runtime, "code", $event.code);
$payload.setProperty(runtime, "message", $event.message);
$payload.setProperty(runtime, "name", $event.name);
$payload.setProperty(runtime, "data", $event.data);
$payload.setProperty(runtime, "currency", $event.currency);
$payload.setProperty(runtime, "precision", $event.precision);
$payload.setProperty(runtime, "value", $event.value);
    return $payload;
  });
}



} // namespace facebook::react
