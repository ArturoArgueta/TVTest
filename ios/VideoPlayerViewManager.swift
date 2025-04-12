//
//  VideoPlayerViewManager.swift
//  quasarcommunity
//
//  Created by Quasar1 on 2/11/25.
//

import Foundation
import React

@objc(VideoPlayerViewManager)
class VideoPlayerViewManager: RCTViewManager {
  override func view() -> UIView! {
    return VideoPlayerView()
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc func play(_ node: NSNumber) {
    print("Play command received for node:", node)
    DispatchQueue.main.async {
      guard let component = self.bridge.uiManager.view(forReactTag: node) as? VideoPlayerView else {
        print("Failed to find VideoPlayerView for node:", node)
        return
      }
      print("Found VideoPlayerView, calling play")
      component.play()
    }
  }
  
  @objc func pause(_ node: NSNumber) {
    print("Pause command received for node:", node)
    DispatchQueue.main.async {
      guard let component = self.bridge.uiManager.view(forReactTag: node) as? VideoPlayerView else {
        print("Failed to find VideoPlayerView for node:", node)
        return
      }
      print("Found VideoPlayerView, calling pause")
      component.pause()
    }
  }
  
  @objc func seekTo(_ node: NSNumber, time: NSNumber) {
    print("Seek command received for node:", node, "time:", time)
    DispatchQueue.main.async {
      guard let component = self.bridge.uiManager.view(forReactTag: node) as? VideoPlayerView else {
        print("Failed to find VideoPlayerView for node:", node)
        return
      }
      print("Found VideoPlayerView, calling seekTo")
      component.seekTo(time: time.floatValue)
    }
  }
}
