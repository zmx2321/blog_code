// 我的报表
// TODO: 请求命名的方式
export default [
  ['getMyReportList', ['/api/report', 'get']], // 我的报表
  ['apiOrgCompanyTree', ['/api/org/deptTreeByOrgIdload', 'get']], // 我的报表 - 树
  ['apiOrgQueryDepartment', ['/api/org/queryDepartment', 'get']], // 我的报表 - 同部门 - 收集对象
  ['apiReportGroupGet', ['/api/reportGroup', 'get']], // 我的报表 - 常用组渲染 - 收集对象
  ['apiReportGroupPut', ['/api/reportGroup', 'put']], // 我的报表 - 常用组修改 - 收集对象
  ['apiReportGroupPost', ['/api/reportGroup', 'post']], // 我的报表 - 常用组添加 - 收集对象
  ['apiReportGroupDelete', ['/api/reportGroup', 'delete']], // 我的报表 - 常用组删除 - 收集对象
  ['apiReportGroupQueryById', ['/api/reportGroup/queryById', 'get']], // 我的报表 - 常用组查用户 - 收集对象
  ['apiReportGroupFindByIds', ['/api/reportGroup/findByIds', 'get']], // 我的报表 - 根据id查用户 - 收集对象
  ['apiReportPost', ['/api/report', 'post']], // 我的报表
  ['queryByReportId', ['/api/report/queryByReportId', 'get']], // 我的报表详情
  ['distribute', ['/api/report/distribute', 'post']], // 我的报表立即分发提交
  ['deleteReport', ['/api/report', 'delete']], // 我的报表删除
  ['enable', ['/api/report/enable', 'post']], // 我的报表启用禁用
  ['fixReportConfig', ['/api/report', 'put']], // 修改报表配置
  ['getDistributionRecordList', ['/api/reportDistribute', 'get']], // 分发记录列表
  ['apiGetList', ['/api/formData/getList', 'post']], // 合并数据列表
  ['setSupplyAgain', ['/api/reportDistribute', 'post']], // 补发
  ['apiReportDistributePut', ['/api/reportDistribute', 'put']], // 延期填报
  ['getCollectionProgressList', ['/api/formData', 'get']], // 收集进度列表
  ['apiSendBackFormData', ['/api/formData/sendBack', 'post']], // 收集进度退回重填
  ['recall', ['/api/reportDistribute', 'delete']], // 撤回报表
  ['apiFormData', ['/api/formData', 'post']], // 待填报报表
  ['apiSubmitFormData', ['/api/formData/submit', 'post']], // 待填报报表
  ['getMyForm', ['/api/formData/getMyForm', 'get']], // 待填报报表
  ['auditList', ['/api/formData/auditList', 'get']], // 审核报表
  ['audit', ['/api/formData/audit', 'post']], // 审核按钮
  ['detail', ['/api/formData/detail', 'get']], // 填报详情
  ['apiGetListData', ['/api/formData/getListData', 'post']], // 数据总览
  ['apiDownloadFormDate', ['/api/formData/download', 'get']], // 数据总览导出
  ['apiCreateRelevance', ['/api/report/createRelevance', 'post']],
  ['apiUpdateRelevance', ['/api/report/updateRelevance', 'put']] // 创建关联表 // 配置关联表
]
