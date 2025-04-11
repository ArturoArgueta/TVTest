import UIKit

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
    override func view() -> (FocusableBorderHostingView){
        return FocusableBorderHostingView()
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}

class FocusableBorderHostingView: UIView {
  @objc var onFocus: RCTBubblingEventBlock?
  @objc var onBlur: RCTBubblingEventBlock?
  @objc var onPress: RCTBubblingEventBlock?
  @objc var scale: NSString?
  @objc var focusable: NSNumber? = 1
  @objc var enableFocusStyle: NSNumber? = 1
  @objc var focusStyle: NSDictionary?
  let event = ["value": "focusEvent"]
  let pressEvent = ["value": "pressEvent"]
  let gradientLayer = CAGradientLayer()
  
  
  init() {
      super.init(frame: .zero)
      let gesture = UITapGestureRecognizer(target: self, action:  #selector (self.onClick (_:)))
      self.addGestureRecognizer(gesture)
  }
  
  required init?(coder: NSCoder) {
      fatalError("init(coder:) has not been implemented")
  }
  
  @objc func onClick(_ sender:UITapGestureRecognizer){
      if onPress != nil {
          onPress!(self.pressEvent)
      }
  }
  
  
  func insertReactSubview(view:UIView!, atIndex:Int) {
      self.insertSubview(view, at:atIndex)
      return
  }
  
  override var canBecomeFocused: Bool {
      return self.focusable == 1
  }
  
  
  @available(iOS 9.0, *)
  override func didUpdateFocus(in context: UIFocusUpdateContext, with coordinator: UIFocusAnimationCoordinator) {
      if context.nextFocusedView == self {
          if onFocus != nil {
              onFocus!(self.event)
          }
          coordinator.addCoordinatedAnimations({ () -> Void in
              if (self.enableFocusStyle == 1) {
                  self.layer.borderWidth = self.focusStyle?["borderWidth"] as? CGFloat ?? 4
                  if let borderColor = self.focusStyle?["borderColor"] as? String {
                      self.layer.borderColor = UIColor(hex: borderColor).cgColor
                  } else {
                      self.layer.borderColor = UIColor.white.cgColor
                  }
              } else {
                  self.layer.borderWidth = 0
                  self.layer.backgroundColor = UIColor.clear.cgColor
                  self.gradientLayer.removeFromSuperlayer()
              }
              let scaleFactor = CGFloat(Float(self.scale! as Substring) ?? 1)
              self.layer.transform = CATransform3DMakeScale(scaleFactor, scaleFactor, scaleFactor)
          }, completion: nil)
          
      } else if context.previouslyFocusedView == self {
          if onBlur != nil {
              onBlur!(self.event)
          }
          coordinator.addCoordinatedAnimations({ () -> Void in
              self.layer.borderWidth = 0
              self.layer.backgroundColor = UIColor.clear.cgColor
              self.layer.transform = CATransform3DMakeScale(1, 1, 1)
              self.gradientLayer.removeFromSuperlayer()
          }, completion: nil)
      }
  }
}
