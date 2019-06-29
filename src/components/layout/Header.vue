<template>
  <nav>
    <div class="container">
      <div class="head">
        <div class="brand">
          <router-link to="/">
            <img :src="require('@/assets/logo.png')"
                 alt="Home"/>
          </router-link>
          <h1>
            Brand name
          </h1>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
  nav {
    .head {
      display: flex;
      padding-top: 8px;
      justify-content: space-between;
      align-items: center;

      .brand {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          margin-right: 16px;
          float: left;
          max-width: 100%;
          vertical-align: middle;
          display: inline-block;
        }

        h1 {
        }
      }
    }
  }
</style>
