<template>
  <div class="home">
    <span class="welcome">欢迎</span>
  </div>
</template>
<script>
export default {};
</script>

<style>
.home {
  width: 100%;
  height: 92vh;
  background: url(../assets/img/bg.png) no-repeat center center;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome {
  font-size: 120px;
  color: rgba(255,255,255,.7);
}
</style>