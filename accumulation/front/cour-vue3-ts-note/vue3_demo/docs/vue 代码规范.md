## 一、必要的

### 1、组件名为多个单词，尽量完整表述意思

**反例**
codeSpecification
```js
Vue.component('todo', {
  // ...
})
export default {
  name: 'Todo',
  // ...
}
```

**正例**

```js
Vue.componenet('todo-item', {
  // ...
})
export default {
  name: 'TodoItem'
}
```

### 2、prop 定义尽量详细，至少指定类型

**反例**

```javascript
props: ['status']
```

**正例**

```javascript
props：{
  name: {
    type: String,
    default: 'dzy',
    required: true    
  }
}
```



### 3、单文件名一定是 帕斯卡命名

**反例**

```javascript
components/
|- mycomponent.vue
components/
|- myComponent.vue
```

**正例**

```javascript
components/
|- MyComponent.vue
components/
|- my-component.vue
```



### 4、特定样式或基础组件，应该以同一个公共前缀开头

**反例**

```js
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```

**正例**

```js
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue
```



### 5、如果一个组件是一个定制组件

如果它不是一个公共组件，这种组件名应以 The 开头，表示唯一性，它不应该接收任何 prop，如果 prop 那么说明它是一个公共组件
**反例**

```javascript
components/
|- Heading.vue
|- MySidebar.vue
```

**正例**

```javascript
components/
|- TheHeading.vue
|- TheSidebar.vue
```



### 6、和父组件紧密耦合子组件，应以父组件名作为前缀名

**反例**

```js
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue
```

**正例**

```js
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```



### 7、组件名以高级别单词开头，以描述性的修饰词结尾

**反例**

```js
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

**正例**

```js
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```



### 8、组件名应为完整的英文单词，不是缩写

**反例**

```js
components/
|- SdSettings.vue
|- UProfOpts.vue
```

**正例**

```js
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
​```


**v10. 在声明prop的时候，名称应为驼峰命名，而在模板和JSX应用中应该是kebab-case**

反例
​```javascript
props: {
  'greeting-text': String
}
<WelcomeMessage greetingText="hi"/>
```

