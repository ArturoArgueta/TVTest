import Foundation
import AVKit
import UIKit
import React

@objc(VideoPlayerView)
class VideoPlayerView: UIView {
    private var player: AVPlayer?
    private var avPlayerLayer: AVPlayerLayer?
    private var _videoGravity: AVLayerVideoGravity = .resizeAspectFill
    private var _borderRadius: CGFloat = 0
    private var overlayContainer: UIView?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = .black
        setupPlayerLayer()
        setupOverlayContainer()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupPlayerLayer()
        setupOverlayContainer()
    }
    
    private func setupOverlayContainer() {
        // Create overlay container
        let container = UIView()
        container.backgroundColor = .clear
        container.isUserInteractionEnabled = true
        container.frame = bounds
        
        addSubview(container)
        overlayContainer = container
    }
    
  @objc override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        if atIndex == 0 {
            // First subview is treated as the video player content
            super.insertSubview(subview, at: 0)
        } else {
            // Additional subviews are added to the overlay container
            overlayContainer?.insertSubview(subview, at: atIndex - 1)
        }
    }
    
    @objc var borderRadius: CGFloat {
        get {
            return _borderRadius
        }
        set {
            _borderRadius = newValue
            layer.cornerRadius = newValue
            layer.masksToBounds = newValue > 0
            print("Border radius set to:", newValue)
        }
    }
    
    @objc var resizeMode: NSString {
        get {
            switch _videoGravity {
            case .resizeAspect:
                return "contain" as NSString
            case .resizeAspectFill:
                return "cover" as NSString
            case .resize:
                return "stretch" as NSString
            default:
                return "cover" as NSString
            }
        }
        set {
            let mode = newValue as String
            switch mode {
            case "contain":
                _videoGravity = .resizeAspect
            case "cover":
                _videoGravity = .resizeAspectFill
            case "stretch":
                _videoGravity = .resize
            default:
                _videoGravity = .resizeAspectFill
            }
            print("Resize mode set to:", mode)
            avPlayerLayer?.videoGravity = _videoGravity
        }
    }
    
    private func setupPlayerLayer() {
        // Remove existing layer if any
        avPlayerLayer?.removeFromSuperlayer()
        
        // Create new player if needed
        if player == nil {
            player = AVPlayer()
        }
        
        // Create and configure AVPlayerLayer
        let playerLayer = AVPlayerLayer(player: player)
        playerLayer.videoGravity = _videoGravity
        playerLayer.frame = bounds
        
        // Add it to the view's layer
        layer.addSublayer(playerLayer)
        avPlayerLayer = playerLayer
        
        // Apply existing border radius if set
        if _borderRadius > 0 {
            layer.cornerRadius = _borderRadius
            layer.masksToBounds = true
        }
        
        print("Player layer setup complete - frame:", bounds)
    }
    
    @objc var videoURL: String = "" {
        didSet {
            print("Video URL changed to:", videoURL)
            // Clean up existing player if any
            player?.pause()
            
            guard let url = URL(string: videoURL) else {
                print("Invalid URL:", videoURL)
                return
            }
            
            print("Setting up player with URL:", url.absoluteString)
            setupAVPlayer(url: url)
        }
    }
    
    private func setupAVPlayer(url: URL) {
        let asset = AVAsset(url: url)
        let playerItem = AVPlayerItem(asset: asset)
        
        // If player already exists, just replace item
        if let existingPlayer = player {
            existingPlayer.replaceCurrentItem(with: playerItem)
        } else {
            player = AVPlayer(playerItem: playerItem)
            // Update the player on the layer
            avPlayerLayer?.player = player
        }
        
        // Add observer for player item status
        playerItem.addObserver(self, forKeyPath: "status", options: [.new, .old], context: nil)
        
        print("AVPlayer setup complete")
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        print("layoutSubviews called - new bounds:", bounds)
        // Update player layer frame when view size changes
        CATransaction.begin()
        CATransaction.setDisableActions(true)
        avPlayerLayer?.frame = self.bounds
        overlayContainer?.frame = self.bounds
        CATransaction.commit()
    }
    
    override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        if keyPath == "status", let playerItem = object as? AVPlayerItem {
            DispatchQueue.main.async {
                switch playerItem.status {
                case .readyToPlay:
                    print("Player is ready to play - layer frame:", self.avPlayerLayer?.frame ?? CGRect.zero)
                    // Don't auto-play, let the user control this
                case .failed:
                    print("Player failed:", playerItem.error?.localizedDescription ?? "unknown error")
                case .unknown:
                    print("Player status unknown")
                @unknown default:
                    break
                }
            }
        }
    }
    
    @objc func pause() {
        print("VideoPlayerView.pause() called")
        player?.pause()
    }
    
    @objc func play() {
        print("VideoPlayerView.play() called")
        player?.play()
    }
    
    @objc func seekTo(time: Float) {
        print("VideoPlayerView.seekTo() called with time:", time)
        player?.seek(to: CMTime(seconds: Double(time), preferredTimescale: 1))
    }
    
    deinit {
        if let playerItem = player?.currentItem {
            playerItem.removeObserver(self, forKeyPath: "status")
        }
        player?.pause()
        player = nil
    }
}
