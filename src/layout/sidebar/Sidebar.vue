<template>
  <aside class="sidebar">
    <ul class="sidebar-menu">
      <li class="sidebar-menu-item active">发现音乐</li>
      <li class="sidebar-menu-item">播客</li>
      <li class="sidebar-menu-item">视频</li>
      <li class="sidebar-menu-item unread">
        朋友
        <div class="red-point"></div>
      </li>
      <li class="sidebar-menu-item">直播</li>
      <li class="sidebar-menu-item">私人FM</li>
    </ul>
    <h1 class="sidebar-title">我的音乐</h1>
    <ul class="sidebar-menu">
      <li class="sidebar-menu-item">
        <i class="iconfont icon-local-music" />
        <span class="name">本地音乐</span>
      </li>
      <li class="sidebar-menu-item">
        <i class="iconfont icon-download" />
        <span class="name">下载管理</span>
      </li>
      <li class="sidebar-menu-item">
        <i class="iconfont icon-cloud" />
        <span class="name">我的音乐云盘</span>
      </li>
      <li class="sidebar-menu-item">
        <i class="iconfont icon-collect" />
        <span class="name">我的收藏</span>
      </li>
    </ul>
    <h1 class="sidebar-title">创建的歌单</h1>
    <ul class="sidebar-menu">
      <li class="sidebar-menu-item">
        <i class="iconfont icon-like" />
        <span class="name">我喜欢的音乐</span>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: $header-height;
  left: 0;
  bottom: 0;
  width: $sidebar-width;
  padding: 10px;
  border-right: 1px solid #efefef;
  box-sizing: border-box;

  .sidebar-menu {
    .sidebar-menu-item {
      display: flex;
      align-items: center;
      height: 46px;
      line-height: 46px;
      margin-bottom: 2px;
      color: #444;
      border-radius: 4px;
      cursor: pointer;
      padding-left: 8px;
      font-size: 18px;

      .iconfont {
        font-size: 18px;
        color: #000;
        flex: 0 0 25px;
      }

      &.active {
        background: rgb(246, 246, 247);
        font-weight: bold;
        font-size: 18px;
      }

      &.unread {
        position: relative;

        .red-point {
          position: absolute;
          top: 12px;
          left: 50px;
          width: 8px;
          height: 8px;
          background: red;
          border-radius: 50%;
        }
      }

      &:hover {
        background: rgb(246, 246, 247);
      }
    }
  }

  .sidebar-title {
    padding: 10px;
    font-size: 16px;
    color: rgb(166, 166, 166);
  }
}
</style>
