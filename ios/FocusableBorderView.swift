import UIKit
import React

extension UIColor {
    convenience init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default: (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            red: CGFloat(r) / 255,
            green: CGFloat(g) / 255,
            blue: CGFloat(b) / 255,
            alpha: CGFloat(a) / 255
        )
    }
}

@objc(FocusableBorderViewManager)
class FocusableBorderViewManager: RCTViewManager {
    override func view() -> UIView! {
        return FocusableBorderHostingView()
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}

class FocusableBorderHostingView: UIView {
    private var contentView: UIView?
    private var reactSubviews: [UIView] = []
    
    @objc var borderColor: NSString = "#FFFFFF" {
        didSet { if _isFocused { applyFocusStyle() } }
    }
    
    @objc var borderWidth: NSNumber = 2 {
        didSet { if _isFocused { applyFocusStyle() } }
    }
    
    @objc var cornerRadius: NSNumber = 8 {
        didSet { layer.cornerRadius = CGFloat(cornerRadius.floatValue) }
    }
    
    @objc var focusAnimationDuration: NSNumber = 200 {
        didSet { /* Convert from milliseconds to seconds if needed */ }
    }
    
    @objc var onPress: RCTBubblingEventBlock?
    @objc var onFocus: RCTBubblingEventBlock?
    @objc var onBlur: RCTBubblingEventBlock?
    @objc var hasTVPreferredFocus: Bool = false
    
    private var _isFocused: Bool = false
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
        setupTapGesture()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func setupView() {
        let container = UIView()
        container.backgroundColor = .clear
        contentView = container
        addSubview(container)
        
        container.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            container.topAnchor.constraint(equalTo: topAnchor),
            container.bottomAnchor.constraint(equalTo: bottomAnchor),
            container.leadingAnchor.constraint(equalTo: leadingAnchor),
            container.trailingAnchor.constraint(equalTo: trailingAnchor)
        ])
        
        layer.cornerRadius = CGFloat(cornerRadius.floatValue)
        clipsToBounds = true
    }
    
    override var preferredFocusEnvironments: [UIFocusEnvironment] {
        return hasTVPreferredFocus ? [self] : []
    }
    
    private func setupTapGesture() {
        let tapGesture = UITapGestureRecognizer(
            target: self,
            action: #selector(handleTap)
        )
        addGestureRecognizer(tapGesture)
    }
    
    @objc private func handleTap() {
        onPress?(["target": reactTag])
    }
    
    override var canBecomeFocused: Bool {
        return true
    }
    
    override func didUpdateFocus(in context: UIFocusUpdateContext, with coordinator: UIFocusAnimationCoordinator) {
        if context.nextFocusedView == self {
            _isFocused = true
            coordinator.addCoordinatedAnimations({
                self.applyFocusStyle()
            }, completion: nil)
            onFocus?(["target": reactTag])
        } else if context.previouslyFocusedView == self {
            _isFocused = false
            coordinator.addCoordinatedAnimations({
                self.clearFocusStyle()
            }, completion: nil)
            onBlur?(["target": reactTag])
        }
    }
    
    private func applyFocusStyle() {
        UIView.animate(withDuration: TimeInterval(focusAnimationDuration.floatValue / 1000)) {
            self.layer.borderColor = UIColor(hex: self.borderColor as String).cgColor
            self.layer.borderWidth = CGFloat(self.borderWidth.floatValue)
        }
    }
    
    private func clearFocusStyle() {
        UIView.animate(withDuration: TimeInterval(focusAnimationDuration.floatValue / 1000)) {
            self.layer.borderWidth = 0
            self.layer.borderColor = UIColor.clear.cgColor
        }
    }
    
    @objc override func insertReactSubview(_ subview: UIView!, at index: Int) {
        reactSubviews.insert(subview, at: index)
        contentView?.insertSubview(subview, at: index)
    }
    
    @objc override func removeReactSubview(_ subview: UIView!) {
        reactSubviews.removeAll { $0 == subview }
        subview.removeFromSuperview()
    }
    
    override func didUpdateReactSubviews() {
        // No-op - handled by insert/remove methods
    }
}
