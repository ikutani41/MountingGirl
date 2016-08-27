/****************************************************************************
 Copyright (c) 2010-2013 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

#import <UIKit/UIKit.h>
#import "cocos2d.h"

#import "AppController.h"
#import "AppDelegate.h"
#import "RootViewController.h"
#import "platform/ios/CCEAGLView-ios.h"

#import "GreeAdsReward.h"

@implementation AppController

#pragma mark -
#pragma mark Application lifecycle

// cocos2d application instance
static AppDelegate s_sharedApplication;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Gree Ads Rewards

 [GreeAdsReward setSiteID:@"15362" siteKey:@"5efb94a46f4d79b5d5dd68da55c26ab0" useSandBox:NO];
    NSURL *url = [NSURL URLWithString:@"yijmtgl://"];
    [GreeAdsReward sendActionWithCampaignID:@"13212" advertisement:@"install" openURL:url];

    // Override point for customization after application launch.

    // Add the view controller's view to the window and display.
    window = [[UIWindow alloc] initWithFrame: [[UIScreen mainScreen] bounds]];
    CCEAGLView *eaglView = [CCEAGLView viewWithFrame: [window bounds]
                                     pixelFormat: kEAGLColorFormatRGBA8
                                     depthFormat: GL_DEPTH24_STENCIL8_OES
                              preserveBackbuffer: NO
                                      sharegroup: nil
                                   multiSampling: NO
                                 numberOfSamples: 0 ];

    [eaglView setMultipleTouchEnabled:YES];
    
    // Use RootViewController manage CCEAGLView
    viewController = [[RootViewController alloc] initWithNibName:nil bundle:nil];
    viewController.wantsFullScreenLayout = YES;
    viewController.view = eaglView;

    // init Growthbeat
    [[Growthbeat sharedInstance] initializeWithApplicationId:@"Pg2mKAEq5rIWSOih" credentialId:@"Mc7mfVT1ff3rfTIqMnLRumc2CLjvzrqi"];
    // get device-token
    [[GrowthPush sharedInstance] requestDeviceTokenWithEnvironment:kGrowthPushEnvironment];
    
/*
    //Nend
    // (2) NADView の作成
    self.nadView = [[NADView alloc] initWithIsAdjustAdSize:YES];
    // (3) ログ出力の指定
    [self.nadView setIsOutputLog:NO];
    // (4) set apiKey, spotId.
    [self.nadView setNendID:@"96179a5fc8efa91d4a4c2f135c5b4afea93c156d" spotID:@"413921"];    // 本番
//    [self.nadView setNendID:@"a6eca9dd074372c898dd1df549301f277c53f2b9" spotID:@"3172"];    // test
    [self.nadView setDelegate:self]; //(5)
    [self.nadView load]; //(6)
*/

    // Set RootViewController to window
    if ( [[UIDevice currentDevice].systemVersion floatValue] < 6.0)
    {
        // warning: addSubView doesn't work on iOS6
        [window addSubview: viewController.view];
    }
    else
    {
        // use this method on ios6
        [window setRootViewController:viewController];
    }
    
    [window makeKeyAndVisible];

    [[UIApplication sharedApplication] setStatusBarHidden: YES];

    // IMPORTANT: Setting the GLView should be done after creating the RootViewController
    cocos2d::GLView *glview = cocos2d::GLViewImpl::createWithEAGLView(eaglView);
    cocos2d::Director::getInstance()->setOpenGLView(glview);

    cocos2d::Application::getInstance()->run();
    return YES;
}


- (void)applicationWillResignActive:(UIApplication *)application {
    /*
     Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
     Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
     */
    // growthbeat
    [[Growthbeat sharedInstance] stop];
    
    cocos2d::Director::getInstance()->pause();
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    /*
     Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
     */
    // growthbeat
    [[Growthbeat sharedInstance] start];
    
    cocos2d::Director::getInstance()->resume();
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    /*
     Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
     If your application supports background execution, called instead of applicationWillTerminate: when the user quits.
     */
    cocos2d::Application::getInstance()->applicationDidEnterBackground();
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    /*
     Called as part of  transition from the background to the inactive state: here you can undo many of the changes made on entering the background.
     */
    cocos2d::Application::getInstance()->applicationWillEnterForeground();
}

- (void)applicationWillTerminate:(UIApplication *)application {
    /*
     Called when the application is about to terminate.
     See also applicationDidEnterBackground:.
     */
}

#pragma mark -
#pragma mark Growthbeat

- (void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [[GrowthPush sharedInstance] setDeviceToken:deviceToken];
}

#pragma mark -
#pragma mark Memory management

- (void)applicationDidReceiveMemoryWarning:(UIApplication *)application {
    /*
     Free up as much memory as possible by purging cached data objects that can be recreated (or reloaded from disk) later.
     */
     cocos2d::Director::getInstance()->purgeCachedData();
}


- (void)dealloc {
    [super dealloc];
/*
    // nend
    [self.nadView setDelegate:nil];  // delegate に nil をセット
    self.nadView = nil;              // プロパティ経由で release、nil をセット

    //[superdealloc]; //MRC(非ARC時には必要)

*/
    // admob
    [self.gadView setDelegate:nil];
    self.gadView = nil;

}

#pragma mark -
#pragma mark Ad integration

- (void) createAdView{
    //Admob
    self.gadView = [[GADBannerView alloc] initWithAdSize:kGADAdSizeBanner];
    [self.gadView setAdUnitID:@"ca-app-pub-6034742531261216/1162161682"];
    [self.gadView setFrame:CGRectMake((viewController.view.frame.size.width - self.gadView.frame.size.width) /2, viewController.view.frame.size.height/2 + 250 - self.gadView.frame.size.height, self.gadView.frame.size.width, self.gadView.frame.size.height)];
    self.gadView.rootViewController = viewController;
    self.gadView.tag = 1;
    [viewController.view addSubview:self.gadView];
    [self.gadView loadRequest:[GADRequest request]];
    
}

- (void) showAdView{
    if (self.gadView == NULL){
        [self createAdView];
        return;
    }
    [self.gadView setHidden:NO];
}

+ (void) ShowAdView{
    AppController *appController = (AppController *)[UIApplication sharedApplication].delegate;
    [appController showAdView];
}
/*
-(void)nadViewDidFinishLoad:(NADView *)adView {
    NSLog(@"delegate nadViewDidFinishLoad:");
    // adjustment size.
    
    [self.nadView setFrame:CGRectMake((viewController.view.frame.size.width - self.nadView.frame.size.width) /2, viewController.view.frame.size.height/2 + 250 - self.nadView.frame.size.height, self.nadView.frame.size.width, self.nadView.frame.size.height)];
    
    [viewController.view addSubview:self.nadView];
}
- (void)nadViewDidClickAd:(NADView *)adView {
    NSLog(@"delegate nadViewDidClickAd:");
}
-(void)nadViewDidReceiveAd:(NADView *)adView {
    NSLog(@"delegate nadViewDidReceiveAd:");
}
-(void)nadViewDidFailToReceiveAd:(NADView *)adView {
    NSLog(@"delegate nadViewDidFailToLoad:");
}
- (void)viewWillDisappear:(BOOL)animated {
    [self.nadView pause];
}
- (void)viewWillAppear:(BOOL)animated {
    [self.nadView resume];
}
*/
@end

