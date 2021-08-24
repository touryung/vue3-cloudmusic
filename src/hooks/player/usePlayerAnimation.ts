import animations from "create-keyframe-animation";

/**
 * 计算偏移量和缩放量
 * @returns
 */
export const getOffsetAndScale = () => {
  const sourceWidth = 48; // 左下角缩略图宽度
  const targetWidth: number = window.innerWidth; // 大图也就是屏幕宽度
  const scale = sourceWidth / targetWidth; // 缩放比例

  const sourceX = 20 + sourceWidth / 2; // 左下角图标距离左侧距离
  const offsetX = -(targetWidth / 2 - sourceX); // 左下角图标距离大图中心 x 偏移

  const sourceY = 10 + sourceWidth / 2; // 左下角图标距离底部距离
  const offsetY = window.innerHeight / 2 - sourceY; // 右上角图标距离大图中心 y 偏移

  return {
    scale,
    offsetX,
    offsetY,
  };
};

export default function usePlayerAnimation() {
  const handleEnter = (el: Element, done: () => void) => {
    const { scale, offsetX, offsetY } = getOffsetAndScale();
    const animation = {
      0: {
        transform: `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${scale})`,
      },
    };
    animations.registerAnimation({
      name: "enter",
      animation,
      pesets: { duration: 300, easing: "linear" },
    });
    animations.runAnimation(el, "enter", done);
  };

  const handleAfterEnter = () => animations.unregisterAnimation("enter");

  const handleLeave = (el: Element, done: () => void) => {
    const { scale, offsetX, offsetY } = getOffsetAndScale();
    const animation = {
      100: {
        transform: `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${scale})`,
      },
    };
    animations.registerAnimation({
      name: "leave",
      animation,
      pesets: { duration: 300, easing: "linear" },
    });
    animations.runAnimation(el, "leave", done);
  };

  const handleAfterLeave = () => animations.unregisterAnimation("leave");

  return {
    handleEnter,
    handleAfterEnter,
    handleLeave,
    handleAfterLeave,
  };
}
