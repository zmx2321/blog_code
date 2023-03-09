// 我的报表
export default [
  ['getMyReportList', ['/api/report', 'get']], // 我的报表
  ['apiOrgCompanyTree', ['/api/org/deptTreeByOrgIdload', 'get']], // 我的报表
  ['apiReportPost', ['/api/report', 'post']], // 我的报表
  ['queryByReportId', ['/api/report/queryByReportId', 'get']], // 我的报表
  ['distribute', ['/api/report/distribute', 'post']], // 我的报表
  // ['distribute', ['/api/report/distribute', 'post']], // 我的报表
  ['getDistributionRecordList', ['/api/reportDistribute', 'get']], // 分发记录
  ['getCollectionProgressList', ['/api/formData', 'get']], // 收集进度
  ['recall', ['/api/reportDistribute', 'delete']], // 撤回报表
  ['apiFormData', ['/api/formData', 'post']], // 待填报报表
  ['apiSubmitFormData', ['/api/formData/submit', 'post']], // 待填报报表
  ['getMyForm', ['/api/formData/getMyForm', 'get']], // 待填报报表
  ['auditList', ['/api/formData/auditList', 'get']], // 审核报表
  ['audit', ['/api/formData/audit', 'post']], // 审核按钮
  ['detail', ['/api/formData/detail', 'get']] // 填报详情
]
