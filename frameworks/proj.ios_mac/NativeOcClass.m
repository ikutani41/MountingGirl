//
//  NativeOcClass.m
//  MountingGirl
//
//  Created by yutaro ikutani on 2015/07/24.
//
//

#import <Foundation/Foundation.h>
#import "NativeOcClass.h"
#import <Social/Social.h>
#import <QuartzCore/QuartzCore.h>
#import "SVProgressHUD/SVProgressHUD.h"


@implementation NativeOcClass

+(BOOL)callNativeUIWithTitle:(NSString *)title andContent:(NSString *)content{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:content delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil];
    [alertView show];
    return true;
}

+(void)postToFacebook{
    NSString *message = @"極めろ！マウンティングガール";
    NSURL *url = [NSURL URLWithString:@"https://yij.sakura.ne.jp/lp/MountingGirl"];
    
    //viewcontroller取得
    UIViewController *topController = [UIApplication sharedApplication].keyWindow.rootViewController;
    // snapshot
    UIGraphicsBeginImageContextWithOptions(topController.view.bounds.size, YES, 0);
    [topController.view drawViewHierarchyInRect:topController.view.bounds afterScreenUpdates:NO];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    //Facebookに投稿
    SLComposeViewController *vc = [SLComposeViewController composeViewControllerForServiceType:SLServiceTypeFacebook];
    [vc addImage:image];
    [vc setInitialText:message];
    [vc addURL:url];
    
    [topController presentViewController:vc animated:YES completion:nil];
}

+(void)postToTwitter{
    NSString *message = @"極めろ！マウンティングガール@MountingGirl";
    NSURL *url = [NSURL URLWithString:@"https://yij.sakura.ne.jp/lp/MountingGirl"];
    
    //viewcontroller取得
    UIViewController *topController = [UIApplication sharedApplication].keyWindow.rootViewController;
    // snapshot
    UIGraphicsBeginImageContextWithOptions(topController.view.bounds.size, YES, 0);
    [topController.view drawViewHierarchyInRect:topController.view.bounds afterScreenUpdates:NO];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    //Twitterに投稿
    SLComposeViewController *vc = [SLComposeViewController composeViewControllerForServiceType:SLServiceTypeTwitter];
    [vc addImage:image];
    [vc setInitialText:message];
    [vc addURL:url];
    
    [topController presentViewController:vc animated:YES completion:nil];
}

+(void)indicatorShow{
    [SVProgressHUD show];
}
+(void)indicatorDismiss{
    [SVProgressHUD dismiss];
}
+(void)disableBannerAd{
// Premium Function  com.yij.mountinggirl_3

    //viewcontroller取得
    UIViewController *topController = [UIApplication sharedApplication].keyWindow.rootViewController;
    //Tag指定して削除
    [[topController.view viewWithTag:1] removeFromSuperview];
}
@end


