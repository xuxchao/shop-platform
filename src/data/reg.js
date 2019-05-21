
export const statusList = [{ label: '正常', value: 1 }, { label: '禁用', value: 0 }]

export const rules = {
  option: [{ required: true, message: '请选择', trigger: 'change' }],
  name: [{ required: true, message: '请输入', trigger: 'blur' }],
  updata: [{ required: true, message: '请上传', trigger: 'blur' }],
  pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }, { pattern: /^[\w]{6,16}$/, message: '6~16位数字字母组成!', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { pattern: /^1[345678]\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }],
  number: [{ required: true, message: '请输入', trigger: 'blur' }, { pattern: /[0-9]+$/, message: '请输入正确格式', trigger: 'blur' }],
  decimals: [{ required: true, message: '请输入', trigger: 'blur' }, { pattern: /^([1-9]\d*|0)(\.\d{1,2})?$/, message: '请输入正确格式', trigger: 'blur' }]
  // url: [{ required: true, message: '请输入', trigger: 'blur' }, { pattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/, message: '请输入正确格式!', trigger: 'blur' }]
}
