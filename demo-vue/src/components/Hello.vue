<template>
  <div class="hello">
     <fieldset id="appModel">
    <legend>双向绑定</legend>
    <p>message: {{message | wrap }}</p>
    <input type="text" v-model="message">
  </fieldset>
  <fieldset id="appModelFun">
    <legend>计算属性</legend>
    <p>{{value}} * 2 = {{b}}</p>
    <p><animated-integer v-bind:value="b"></animated-integer></p>
    <input type="text" v-model="value">
  </fieldset>
  <fieldset >
    <legend>表单验证用户名</legend>
    <validity ref="username" field="username" v-model="validation" :validators="{ required: true, minlength: 4 }">
        <input type="text" @input="$refs.username.validate()" @focusout="$refs.username.validate()">
      </validity>
      <div class="errors">
        <p class="required" v-if="validation.result.required">请输入用户名!!</p>
        <p class="minlength" v-if="validation.result.minlength">用户名至少4个字符!!</p>
      </div>
  </fieldset>
  <fieldset id="appList">
    <legend>渲染列表</legend>
    <ul>
      <li v-for="todo in todos">{{todo.text}}</li>
    </ul>
    <ul>
      <li v-for="n in evenNumbers">{{n}}</li>
    </ul>
  </fieldset>
  <fieldset id="appEvent">
    <legend>限制输入格式为数字小数点后2位</legend>
    <input ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)"/>
  </fieldset>
  <fieldset id="appEvent">
    <legend>用户操作</legend>
    <p>{{message}}</p>
    <button class="btn" v-on:click="reverseMessage">reverse message</button>
  </fieldset>
  <fieldset id="appAll">
    <legend>综合</legend>
    <input type="text" ref='todo' v-focus="focused" @blur="focused = false" @focus="focused = true" v-model="newTodo" v-on:keyup.enter="addTodo">
    <ul>
      <li v-for="(todo, index) in todos">
        <span>{{ todo.text }}</span>
        <button v-on:click="removeTodo(index)">X</button>
      </li>
    </ul>
  </fieldset>
  </div>
</template>

<script>
import { mixin as focusMixin } from 'vue-focus'
import AnimatedIneger from './AnimatedInteger'

export default {
  name: 'hello',
  mixins: [ focusMixin ],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message: 'Hello vuejs',
      validation: {
        result: {}
      },
      numbers: [1, 2, 3, 4, 5, 6],
      newTodo: '',
      todos: [
        {text: 'HTML'},
        {text: 'CSS'},
        {text: 'javascript'}
      ],
      value: 1,
      focused: true
    }
  },
  mounted: function () {
    this.focused = false
  },
  computed: {
    b: function () {  // 可以是get set组成的对象
      return this.value * 2
    },
    evenNumbers: function () {
      return this.numbers.filter(function (number) {
        return number % 2 === 0
      })
    }
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    },
    addTodo: function () {
      var text = this.newTodo.trim()
      if (text) {
        this.todos.push({ text: text })
        this.newTodo = ''
      }
    },
    removeTodo: function (index) {
      this.todos.splice(index, 1)
    },
    handleValidate: function (e) {
      e.target.$validity.validate()
    },
    updateValue: function (value) {
      if (isNaN(Number(value))) {
        value = value.replace(/\D/g, '')
      }
      var formattedValue = value
        // Remove whitespace on either side
        .trim()
        // Shorten to 2 decimal places
        .slice(0, value.indexOf('.') + 3)
      // If the value was not already normalized,
      // manually override it to conform
      if (formattedValue !== this.$refs.input.value) {
        this.$refs.input.value = formattedValue
      }
      this.value = Number(formattedValue)
      // Emit the number value through the input event
      this.$emit('input', Number(formattedValue))
    }
  },
  components: {
    'animated-integer': AnimatedIneger
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.hidden,
[hidden] {
  display: none;
}

fieldset {
  margin: 20px;
}

input.invalid { border-color: red; }
.errors { color: red; }
</style>
