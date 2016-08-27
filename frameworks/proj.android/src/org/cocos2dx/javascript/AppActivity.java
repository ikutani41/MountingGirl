/****************************************************************************
Copyright (c) 2008-2010 Ricardo Quesada
Copyright (c) 2010-2012 cocos2d-x.org
Copyright (c) 2011      Zynga Inc.
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

package org.cocos2dx.javascript;

import org.cocos2dx.MountingGirl.R;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.os.Bundle;
import android.view.Display;
import android.view.View;
import android.view.ViewGroup;
import android.graphics.Point;
//import android.util.Log;
import android.view.Gravity;
//import android.widget.FrameLayout;
//import android.widget.LinearLayout;
import android.widget.RelativeLayout;

//import com.google.android.gms.common.ConnectionResult;
//import com.google.android.gms.common.api.GoogleApiClient;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.net.Uri;

//import net.nend.android.NendAdListener;
//import net.nend.android.NendAdView;

import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;

import com.growthbeat.BuildConfig;
import com.growthbeat.Growthbeat;
import com.growthpush.GrowthPush;
import com.growthpush.model.Environment;

public class AppActivity extends Cocos2dxActivity {
	
	private static AppActivity app = null;
    private static ProgressDialog progressDialog;
    private static AdView gAdView = null;
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = this;
        
        Growthbeat.getInstance().initialize(this, "Pg2mKAEq5rIWSOih", "Mc7mfVT1ff3rfTIqMnLRumc2CLjvzrqi");
        GrowthPush.getInstance().requestRegistrationId("214312813841", BuildConfig.DEBUG ? Environment.development : Environment.production);
        Growthbeat.getInstance().start();
        
        /*
        Display display = this.getWindowManager().getDefaultDisplay();
        Point point = new Point();
        display.getSize(point);
        int h = point.y;
		int m = Math.round(h/30);
		
        // admob
        gAdView = new AdView(this);
        gAdView.setAdSize(AdSize.BANNER);
        gAdView.setAdUnitId("ca-app-pub-6034742531261216/5592361280");
        gAdView.setTag(100);

		

        final FrameLayout.LayoutParams adParams = new FrameLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT,LinearLayout.LayoutParams.WRAP_CONTENT);
        adParams.gravity = (Gravity.CENTER_HORIZONTAL | Gravity.BOTTOM);
        adParams.setMargins(0,0,0,m);
    	addContentView(gAdView, adParams);

		AdRequest adReq = new AdRequest.Builder().build();
        gAdView.loadAd(adReq);
*/        
/*
        // nend
        final NendAdView nendAdView = new NendAdView(getApplicationContext(), 420569, "6e9d7181191fc523411869ef717451de9640a1d9");
        final FrameLayout.LayoutParams adParams = new FrameLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT,LinearLayout.LayoutParams.WRAP_CONTENT);
        adParams.gravity = (Gravity.CENTER_HORIZONTAL | Gravity.BOTTOM);
        addContentView(nendAdView, adParams);
        nendAdView.loadAd();
        nendAdView.setListener(this);
*/

    }
    
    public void onStop(Bundle savedInstanceState){
    	Growthbeat.getInstance().stop();
    }

    // AdMob
    public static void createAdView(){
    	app.runOnUiThread(new Runnable() {
    		@Override
    		public void run(){
    			if (gAdView == null){
    		        Display display = app.getWindowManager().getDefaultDisplay();
    		        Point point = new Point();
    		        display.getSize(point);
    		        int h = point.y;
    				int m = Math.round(h/2);
    				
    				// admob
    		        gAdView = new AdView(app);
    		        gAdView.setAdSize(AdSize.BANNER);
    		        gAdView.setAdUnitId("ca-app-pub-6034742531261216/5592361280");

    		        final RelativeLayout relativeLayout = new RelativeLayout(app);
    		        final RelativeLayout.LayoutParams adParams = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
    		        adParams.setMargins(0,0,0,m);
    				app.addContentView(relativeLayout, adParams);
    				relativeLayout.setVerticalGravity(Gravity.BOTTOM);
    				relativeLayout.addView(gAdView);

    				AdRequest adReq = new AdRequest.Builder().build();
    		        gAdView.loadAd(adReq);
		        }
    		}
    	});
    }
    
    public static void showAdView(){
    	if(app == null) return;
    	
    	if(gAdView == null){
    		createAdView();
    		return;
    	}
    	
    	app.runOnUiThread(new Runnable(){
    		@Override
    		public void run(){
    			gAdView.setVisibility(View.VISIBLE);
    		}
    	});
    }

    public static void hideAdView(){
    	if(app == null) return;
    	if(gAdView == null) return;
    	
    	app.runOnUiThread(new Runnable(){
    		@Override
    		public void run(){
    			gAdView.setVisibility(View.INVISIBLE);
    		}
    	});
    }

    // Facebook
    public static void facebookPost(){
        if(isShareAppInstall("com.facebook.katana")){
        	Intent intent = new Intent(Intent.ACTION_SEND);
        	intent.setPackage("com.facebook.katana");
        	intent.setType("text/plain");
        	intent.putExtra(Intent.EXTRA_TEXT, "http://yij.sakura.ne.jp/lp/MountingGirl");
            app.startActivity(intent);
        }else{
            shareAppDl("com.facebook.katana");
        }
    }

    // Twitter
    public static void twitterPost(){
        if(isShareAppInstall("com.twitter.android")){        	
        	Intent intent = new Intent(Intent.ACTION_SEND);
        	intent.setPackage("com.twitter.android");
        	intent.setType("text/plain");
        	intent.putExtra(Intent.EXTRA_TEXT, "極めろ！マウンティングガール\n@MountingGirl");
//        	intent.putExtra(Intent.EXTRA_STREAM,  Uri.parse(image));	// imageはpath
            app.startActivity(intent);
        }else{
            shareAppDl("com.twitter.android");
        }
    }

    // アプリがインストールされているかチェック
    private static Boolean isShareAppInstall(String packagename){
        try {
            PackageManager pm = app.getPackageManager();
            pm.getApplicationInfo(packagename, PackageManager.GET_META_DATA);
            return true;
        } catch (NameNotFoundException e) {
            return false;
        }
    }

    // アプリが無かったのでGooglePalyに飛ばす
    private static void shareAppDl(String packagename){
        Uri uri = Uri.parse("market://details?id="+packagename);
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        app.startActivity(intent);
    }
    
    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);

        return glSurfaceView;
    }
    
	public static void showAlertDialog(final String title, final String message) {
        app.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                AlertDialog alertDialog = new AlertDialog.Builder(app).create();
                alertDialog.setTitle(title);
                alertDialog.setMessage(message);
                alertDialog.setCancelable(true);
                alertDialog.setIcon(R.drawable.icon);
                alertDialog.show();
            }
        });
    }
	
    public static void progressShow(){
    	app.runOnUiThread(new Runnable(){
    		@Override
    	    public void run() {
    	        progressDialog = new ProgressDialog(app);
    	        progressDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
    	        progressDialog.setMessage("処理を実行中しています");
    	        progressDialog.setCancelable(true);
    	        progressDialog.show();
    	    }    		
    	});
    }
	    
    public static void progressDismiss() {
    	app.runOnUiThread(new Runnable(){
    		@Override
    		public void run(){
    			if(progressDialog != null){
        	        progressDialog.dismiss();    				
    			}
    		}
    	});
    }

/*
	@Override
	public void onClick(NendAdView arg0) {
		Log.v("MountingGirl", "nend onClick");
	}

	@Override
	public void onDismissScreen(NendAdView arg0) {
		Log.v("MountingGirl", "nend onDismissScreen");		
	}

	@Override
	public void onFailedToReceiveAd(NendAdView arg0) {
		Log.v("MountingGirl", "nend onFailedToReceivedAd");		
	}

	@Override
	public void onReceiveAd(NendAdView arg0) {
		Log.v("MountingGirl", "nend onReceivedAd");		
	}
*/
}
