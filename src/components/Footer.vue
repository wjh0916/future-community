<template>
  <div class="footer">
    <p>Copyright &copy; 2021 慕尘 | 京ICP备xxxxxxxx号</p>
    <p class="email">E-mail：muchen_0916@qq.com</p>
  </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 80px;
  padding-top: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(23, 32, 53);

  p {
    font-size: 14px;
    color: rgb(173, 173, 173);
  }

  .email {
    margin: 10px 0;
  }
}
</style>