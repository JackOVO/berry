(function() {
  'use strict';
  // 调度服务

  angular
    .module('pf.core')
    .factory('dispatchService', dispatchService);

  dispatchService.$inject = ['workbookService', 'sheetService', 'indicatorService'];
  function dispatchService(workbookService, sheetService, indicatorService) {
    var service = {
      'execution': execution,
      'getCoolMenu': function(){ return menuData; },
    };
    return service;

    /**
     * 具体调度的执行方法
     * @param  {Stirng} key 最深方法名
     * @param  {Stirng} keys 一次向上的方法名
     */
    function execution(key, keys) {
      if (!keys.length) { return; } // 根

      var fstr = keys.join('-');
console.info(key, keys);

      switch(key) {
        case 'close': workbookService.remoceNowSheet(); break;
        case 'newSheet': indicatorService.openModel('addSheet'); break;
        case 'addIn': indicatorService.openModel('syncWorkBook'); break;
        default: sheetService.tableSort('column', 'desc', 3); break;
      }

      switch(fstr) {
        case 'rows-table':
        case 'columns-table':
          sheetService.tableTotal(keys[0], key);
        break;
        default: break;
      }
    }
  }

  // 菜单数据
  var menuData = [
    {'key': 'file', 'text': '文件', 'childs': [
      {'key':'newSheet', 'text': '添加工作表'},
      {'type': 'line'},
      {'key':'openDB', 'text': '打开数据'},
      {'key':'addIn', 'text': '添加指标'},
      {'type': 'line'},
      {'key':'save', 'text': '保存'},
      {'key':'dowload', 'text': '下载'},
      {'type': 'line'},
      {'key':'close', 'text': '关闭'}
    ]},
    {'key':'table', 'text': '表格', 'childs': [
      {'key':'rows', 'text': '行合计', 'childs': [
        {'key':'sum', 'text': '总和'},
        {'key':'mean', 'text': '均值'},
        {'key':'max', 'text': '最大值'},
        {'key':'min', 'text': '最小值'},
        {'type': 'line'},
        {'key':'nonempty', 'text': '非空数目'},
        {'key':'empty', 'text': '空数目'},
        {'key':'mode', 'text': '众数'},
        {'key':'median', 'text': '中位数'},
        {'key':'variance', 'text': '方差'},
        {'key':'cv', 'text': '变异系数'},
        {'key':'sd', 'text': '标准差'},
        {'key':'skewness', 'text': '偏度'},
        {'key':'kurtosis', 'text': '峰度'},
        {'key':'range', 'text': '极差'},
        {'key':'squares', 'text': '平方和'},
        {'type': 'line'},
        {'key':'upperdecile', 'text': '上十分位'},
        {'key':'lowerdecile', 'text': '下十分位'},
        {'key':'upperquartile', 'text': '上四分位'},
        {'key':'lowerquartile', 'text': '下四分位'}
      ]},
      {'key':'columns', 'text': '列合计', 'childs': [
        {'key':'sum', 'text': '总和'},
        {'key':'mean', 'text': '均值'},
        {'key':'max', 'text': '最大值'},
        {'key':'min', 'text': '最小值'},
        {'type': 'line'},
        {'key':'nonempty', 'text': '非空数目'},
        {'key':'empty', 'text': '空数目'},
        {'key':'mode', 'text': '众数'},
        {'key':'median', 'text': '中位数'},
        {'key':'variance', 'text': '方差'},
        {'key':'cv', 'text': '变异系数'},
        {'key':'sd', 'text': '标准差'},
        {'key':'skewness', 'text': '偏度'},
        {'key':'kurtosis', 'text': '峰度'},
        {'key':'range', 'text': '极差'},
        {'key':'squares', 'text': '平方和'},
        {'type': 'line'},
        {'key':'upperdecile', 'text': '上十分位'},
        {'key':'lowerdecile', 'text': '下十分位'},
        {'key':'upperquartile', 'text': '上四分位'},
        {'key':'lowerquartile', 'text': '下四分位'}
      ]}
    ]},
    {'key': 'chart', 'text': '图表', 'childs': [
      {'key': 'Line', 'text': '折线图'},
      {'key': 'StackLine', 'text': '堆积折线图'},
      {'type': 'line'},
      {'key': 'Bar', 'text': '柱形图'},
      {'key': 'StackBar', 'text': '堆积柱形图'},
      {'type': 'line'},
      {'key': 'RotateBar', 'text': '条形图'},
      {'key': 'StackRotateBar', 'text': '堆积条形图'},
      {'type': 'line'},
      {'key': 'Area', 'text': '面积图'},
      {'key': 'StackArea', 'text': '堆积面积图'},
      {'type': 'line'},
      {'key': 'Pie', 'text': '饼图'},
      {'key': 'Ring', 'text': '环形图'},
      {'key': 'Radar', 'text': '雷达图'},
      {'key': 'FillRadar', 'text': '填充雷达图'}
    ]},
    {'key': 'map', 'text': '地图', 'childs': [
      {'key': 'hmap', 'text': '绘制地图'}
    ]},
    {'key': 'xxx', 'text': '分析预测', 'childs': [
      {'key':'timeseries', 'text': '变量处理', 'childs': [
        {'key': 'clear', 'text': '清除结果'},
        {'key': 'gr', 'text': '增长率', 'childs': [
          {'key': 'grytd', 'text': '年比增长'},
          {'key': 'grpop', 'text': '环比增长'},
          {'key': 'gryoy', 'text': '同比增长'}
        ]},
        {'key': 'diff', 'text': '差分', 'childs': [
          {'key': 'diff', 'text': '差分'},
          {'key': 'diffytd', 'text': '年比差分'},
          {'key': 'diffpop', 'text': '环比差分'},
          {'key': 'diffyoy', 'text': '同比差分'}
        ]},
        {'key': 'dlog', 'text': '自然对数差分', 'childs': [
          {'key': 'dlogpop', 'text': '自然对数环比差分'},
          {'key': 'dlogyoy', 'text': '自然对数同比差分'},
          {'key': 'dlogytd', 'text': '自然对数年比差分'}
        ]},
        {'key': 'lag', 'text': '滞后函数'},
        {'key': 'lead', 'text': '先行函数'},
        {'key': 'ratio', 'text': '发展速度', 'childs': [
          {'key': 'ratiopop', 'text': '环比发展速度'},
          {'key': 'ratioyoy', 'text': '同比发展速度'},
          {'key': 'ratioytd', 'text': '年比发展速度'}
        ]},
        {'key':'cumu', 'text': '累积方法', 'childs': [
            {'key': 'cumumin', 'text': '累积最小值'},
          {'key': 'cumumax', 'text': '累积最大值'},
          {'key': 'cumuavg', 'text': '累积平均值'},
          {'key': 'cumustd', 'text': '累积标准差'},
          {'key': 'cumusum', 'text': '累积求和'},
          {'key': 'cumumult', 'text': '累积乘积'},
        ]},
        {'key': 'std', 'text': '标准化'},
      ]},
      {'key': 'missvalue', 'text': '缺省值处理', 'childs': [
        {'key': 'delete', 'text': '删除'},
        {'key': 'avg', 'text': '序列均值'},
        {'key': 'cis', 'text': '三次样条内差'},
        {'key': 'geo', 'text': '几何插补'},
        {'key': 'li', 'text': '线性插值'},
        {'key': 'lt', 'text': '线性趋势'},
        {'key': 'lv', 'text': '前一个值'},
        {'key': 'nv', 'text': '后一个值'},
        {'key': 'lgr', 'text': '前N个增长率'},
        {'key': 'ngr', 'text': '后N个增长率'},
        {'key': 'nmean', 'text': '相邻N点均值'},
        {'key': 'nmedian', 'text': '相邻N点中位数'},
        {'key': 'random', 'text': '随机值'}
      ]},
      {'key': 'aggregation', 'text': '时间聚合', 'childs': [
        {'key': 'clear', 'text': '清除结果'},
        {'key': 'MAX_AGGRE', 'text': '最大值聚合'},
        {'key': 'MIN_AGGRE', 'text': '最小值聚合'},
        {'key': 'FIR_AGGRE', 'text': '首元素聚合'},
        {'key': 'LAST_AGGRE', 'text': '末元素聚合'},
        {'key': 'MEAN_AGGRE', 'text': '平均值聚合'},
        {'key': 'STD_AGGRE', 'text': '标准差'},
        {'key': 'SUM_AGGRE', 'text': '求和'}
      ]},
      {'key': 'return', 'text': '回归', 'childs': [
        {'key': 'lr', 'text': '线性回归'},
        {'key': 'curvefit', 'text': '曲线估计'},
        {'key': 'leastSquares', 'text': '二阶段最小二乘'}
      ]},
      {'key': 'correlation', 'text': '相关性分析', 'childs': [
        {'key': 'bivar', 'text': '双变量'},
        {'key': 'partial', 'text': '偏相关'}
      ]},
      {'key': 'timeanalysis', 'text': '时间序列分析', 'childs': [
        {'key': 'autocorre', 'text': '自相关分析'},
        {'key': 'hpfilter', 'text': 'H-P滤波'},
        {'key': 'expsmooth', 'text': '指数平滑'},
        {'key': 'arima', 'text': 'ARIMA'},
      ]},
      {'key': 'pcfAnalysis', 'text': '主成分/因子分析', 'childs': [
        {'key': 'preAnalysis', 'text': '预分析'},
        {'key': 'pcanalysis', 'text': '主成分分析'},
        {'key': 'factorAnalysis', 'text': '因子分析'}
      ]}
    ]},
    {'key': 'help', 'text': '帮助', 'childs': [
      {'key': 'help1', 'text': '表'}
    ]}
  ];

})();