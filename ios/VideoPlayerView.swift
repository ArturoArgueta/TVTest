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
    private var playerViewController: AVPlayerViewController?
    private var useNativeControls: Bool = false
    private var timeObserver: Any?
    private var statusObserver: NSKeyValueObservation?
    
    @objc var onProgress: RCTDirectEventBlock?
    @objc var onEnd: RCTDirectEventBlock?
    @objc var onLoad: RCTDirectEventBlock?
    @objc var onError: RCTDirectEventBlock?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = .black
        
        // Use native controls automatically on tvOS
        #if os(tvOS)
        useNativeControls = true
        #endif
        
        setupPlayer()
        setupOverlayContainer()
        setupGestureRecognizers()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        
        // Use native controls automatically on tvOS
        #if os(tvOS)
        useNativeControls = true
        #endif
        
        setupPlayer()
        setupOverlayContainer()
        setupGestureRecognizers()
    }
    
    private func setupPlayer() {
        if player == nil {
            player = AVPlayer()
        }
        
        if useNativeControls {
            setupPlayerViewController()
        } else {
            setupPlayerLayer()
        }
    }
    
    private func setupPlayerViewController() {
        // Remove player layer if it exists
        avPlayerLayer?.removeFromSuperlayer()
        avPlayerLayer = nil
        
        // Create AVPlayerViewController if needed
        if playerViewController == nil {
            let controller = AVPlayerViewController()
            controller.showsPlaybackControls = true
            controller.player = player
            
            // Configure view
            if let playerView = controller.view {
                playerView.frame = bounds
                playerView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
                
                // Add to view hierarchy
                addSubview(playerView)
                
                // Log for debugging
                print("Added AVPlayerViewController view to hierarchy, bounds:", bounds)
            }
            
            // Add the controller as a child view controller
            if let parentViewController = self.findViewController() {
                parentViewController.addChild(controller)
                controller.didMove(toParent: parentViewController)
                print("Added AVPlayerViewController to parent view controller")
            } else {
                print("Warning: Could not find parent view controller")
            }
            
            playerViewController = controller
        }
        
        // Apply corner radius if needed
        if _borderRadius > 0 {
            playerViewController?.view.layer.cornerRadius = _borderRadius
            playerViewController?.view.layer.masksToBounds = true
        }
    }
    
    // Helper method to find the parent view controller
    private func findViewController() -> UIViewController? {
        var responder: UIResponder? = self
        while let nextResponder = responder?.next {
            responder = nextResponder
            if let viewController = responder as? UIViewController {
                return viewController
            }
        }
        return nil
    }
    
    private func setupPlayerLayer() {
        // Clean up player view controller if it exists
        playerViewController?.view.removeFromSuperview()
        playerViewController?.player = nil
        playerViewController = nil
        
        // Create and configure AVPlayerLayer
        let playerLayer = AVPlayerLayer(player: player)
        playerLayer.videoGravity = _videoGravity
        playerLayer.frame = bounds
        
        // Add it to the view's layer
        layer.addSublayer(playerLayer)
        avPlayerLayer = playerLayer
        
        // Apply corner radius if needed
        if _borderRadius > 0 {
            layer.cornerRadius = _borderRadius
            layer.masksToBounds = true
        }
    }
    
    private func setupGestureRecognizers() {
        #if os(tvOS)
        // For tvOS, add a tap gesture recognizer to show/hide controls
        let tapRecognizer = UITapGestureRecognizer(target: self, action: #selector(handleTap))
        tapRecognizer.allowedPressTypes = [NSNumber(value: UIPress.PressType.select.rawValue)]
        addGestureRecognizer(tapRecognizer)
        
        // Add a gesture recognizer for play/pause
        let playPauseRecognizer = UITapGestureRecognizer(target: self, action: #selector(handlePlayPause))
        playPauseRecognizer.allowedPressTypes = [NSNumber(value: UIPress.PressType.playPause.rawValue)]
        addGestureRecognizer(playPauseRecognizer)
        #endif
    }
    
    #if os(tvOS)
    @objc func handleTap(_ recognizer: UITapGestureRecognizer) {
        if useNativeControls {
            playerViewController?.showsPlaybackControls.toggle()
        }
    }
    
    @objc func handlePlayPause(_ recognizer: UITapGestureRecognizer) {
        if let player = player {
            if player.timeControlStatus == .playing {
                player.pause()
            } else {
                player.play()
            }
        }
    }
    #endif
    
    private func setupOverlayContainer() {
        // Create overlay container
        let container = UIView()
        container.backgroundColor = .clear
        container.isUserInteractionEnabled = true
        container.frame = bounds
        
        addSubview(container)
        overlayContainer = container
        
        // Ensure overlay is on top
        if let playerView = playerViewController?.view, playerView.superview == self {
            bringSubviewToFront(container)
        }
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
            
            if useNativeControls {
                playerViewController?.view.layer.cornerRadius = newValue
                playerViewController?.view.layer.masksToBounds = newValue > 0
            } else {
                layer.cornerRadius = newValue
                layer.masksToBounds = newValue > 0
            }
            
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
        // Remove existing time observer
        if let observer = timeObserver {
            player?.removeTimeObserver(observer)
            timeObserver = nil
        }
        
        // Remove existing item observers
        if let observer = statusObserver {
            observer.invalidate()
            statusObserver = nil
        }
        
        let asset = AVAsset(url: url)
        let playerItem = AVPlayerItem(asset: asset)
        
        // Add observer for player item status
        statusObserver = playerItem.observe(\.status, options: [.new, .old]) { [weak self] (item, change) in
            guard let self = self else { return }
            DispatchQueue.main.async {
                switch item.status {
                case .readyToPlay:
                    print("Player is ready to play")
                    if let duration = self.player?.currentItem?.duration.seconds, !duration.isNaN {
                        self.onLoad?(["duration": duration])
                    }
                case .failed:
                    print("Player failed:", item.error?.localizedDescription ?? "unknown error")
                    if let error = item.error {
                        self.onError?(["error": error.localizedDescription])
                    }
                case .unknown:
                    print("Player status unknown")
                @unknown default:
                    break
                }
            }
        }
        
        // Add end of playback observer
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(playerItemDidReachEnd),
            name: .AVPlayerItemDidPlayToEndTime,
            object: playerItem
        )
        
        // If player already exists, just replace item
        if let existingPlayer = player {
            existingPlayer.replaceCurrentItem(with: playerItem)
        } else {
            player = AVPlayer(playerItem: playerItem)
            // Update the player on the layer or view controller
            if useNativeControls {
                playerViewController?.player = player
            } else {
                avPlayerLayer?.player = player
            }
        }
        
        // Add periodic time observer for progress updates
        let interval = CMTime(seconds: 0.5, preferredTimescale: CMTimeScale(NSEC_PER_SEC))
        timeObserver = player?.addPeriodicTimeObserver(forInterval: interval, queue: DispatchQueue.main) { [weak self] time in
            guard let self = self else { return }
            
            let currentTime = time.seconds
            // Check if currentTime is NaN
            if currentTime.isNaN { return }
            
          
            guard let duration = self.player?.currentItem?.duration.seconds, !duration.isNaN else {
                return
            }
            
            self.onProgress?(["currentTime": currentTime, "duration": duration])
        }
    }
    
    @objc func playerItemDidReachEnd(notification: Notification) {
        onEnd?([:])
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        
        CATransaction.begin()
        CATransaction.setDisableActions(true)
        
        if useNativeControls {
            playerViewController?.view.frame = bounds
        } else {
            avPlayerLayer?.frame = bounds
        }
        
        overlayContainer?.frame = bounds
        CATransaction.commit()
        
        // Make sure overlay is always on top
        if let container = overlayContainer {
            bringSubviewToFront(container)
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
        if let observer = timeObserver {
            player?.removeTimeObserver(observer)
        }
        
        if let observer = statusObserver {
            observer.invalidate()
        }
        
        NotificationCenter.default.removeObserver(self)
        player?.pause()
        player = nil
    }
    
    #if os(tvOS)
    // MARK: - tvOS Focus Properties
    override var canBecomeFocused: Bool {
        return true
    }
    
    // Preferred focus environment
    override var preferredFocusEnvironments: [UIFocusEnvironment] {
        if let playerViewController = playerViewController {
            // When using the view controller, prefer to focus its view for better control handling
            return [playerViewController]
        }
        return [self]
    }
    #endif
}

