//
//  NativeOcClass.h
//  MountingGirl
//
//  Created by yutaro ikutani on 2015/07/24.
//
//

#import <Foundation/Foundation.h>


@interface NativeOcClass : NSObject

+(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content;
+(void)postToTwitter;
+(void)postToFacebook;
+(void)indicatorShow;
+(void)indicatorDismiss;
+(void)disableBannerAd;
@end

