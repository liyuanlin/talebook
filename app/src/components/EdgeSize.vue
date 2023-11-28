<template>
  <v-dialog v-model="dialog" persistent transition="dialog-bottom-transition" width="400">
    <v-card>
      <v-toolbar flat dense dark color="primary">
        重新组合章节
        <v-spacer></v-spacer>
        <v-btn color="" text @click="close_dialog()">关闭</v-btn>
      </v-toolbar>
      <v-card-title></v-card-title>
      <v-card-text>
        <p>针对Edge朗读优化，合并多章为一章，方便朗读不中断</p>
        <v-form ref="form" @submit="do_open_url">
          <v-text-field v-model="size" :rules="sizeRules" label="请输入新章节包含多少旧的章节"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="do_open_url()">确定</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: true,
    size: 3,
    sizeRules: [
      value => {
        if (/[0-9]/.test(value)) return true
        return 'Unqualified characters.'
      },
    ],
  }),
  props: {
    visible: { // 父页面传递过来的visible值，用visible接收，而不是使用 menuVisible 接收
      type: Boolean,
      default: false,
    },
    book_id: Number,
  },
  methods: {
    do_open_url: function () {
      let nurl = '/read/edge/' + this.book_id+'?size='+this.size;
      window.open(nurl);
      this.$emit("update:visible", false);
    },
    close_dialog:function(){
      this.$emit("update:visible", false);
    }
  },

}
</script>

