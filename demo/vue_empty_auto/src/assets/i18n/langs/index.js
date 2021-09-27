import en from './en'
import cn from './cn'
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

const messages =  {
  en:{
      ...en,
      ...enLocale
  },
  cn: {
      ...cn,
      ...zhLocale
  }
}

export default messages;