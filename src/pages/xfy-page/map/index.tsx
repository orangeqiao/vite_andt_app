import * as echarts from 'echarts';
import { MapChart } from 'echarts/charts';
import {
  LegendComponent,
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  DataZoomComponent,
} from 'echarts/components';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useMount } from '@hooks';
import dayjs from 'dayjs'
import world from './world.json';
import {
  geoCoordMap,
  OMData,
  dotData,
  tableDataMap,
  areaData,
  geoData,
} from './map';
import style from './style.module.less';

export interface TableDataType {
  id: string | number;
  [propName: string]: any;
}

// 导入世界地图
// @ts-ignore
echarts.registerMap('world', world);

export default function JsonMap() {
  const chartRef = useRef<ReturnType<typeof echarts.init> | null>(null);
  const echartsMapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  // 当前选中经纬度
  const [currentValue, setCurrentValue] = useState<number[] | null>(null);
  // 当前高亮的值
  // 索引值为seriesIndex, 值为dataIndex
  const [currentSelectArea, setCurrentSelectArea] = useState<string>('');

  useMount(() => {
    echarts.use([
      DataZoomComponent,
      TitleComponent,
      TooltipComponent,
      LegendComponent,
      MapChart,
      GridComponent,
      CanvasRenderer,
      LabelLayout,
      DatasetComponent,
    ]);
    chartRef.current = echarts.init(echartsMapRef.current!);
  });

  // 小飞机的图标，可以用其他图形替换
  // symbol 的角度会随着轨迹的切线变化，自定义 path 需要保证图形的朝向是朝上的，以保证图形始终朝着轨迹运动的方向。
  const planePath =
    'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

  // 获取地图中起点和终点的坐标，以数组形式保存下来
  const convertData = (data: any) => {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      const fromCoord = geoCoordMap[dataItem[0].name];
      const toCoord = geoCoordMap[dataItem[1].name];
      if (fromCoord && toCoord) {
        res.push([
          // 起点坐标
          { coord: fromCoord },
          // 终点坐标
          { coord: toCoord },
        ]);
      }
    }
    return res;
  };
  const COLOR = ['pink', '#9ae5fc', 'chartreuse']; // 自定义图中要用到的颜色
  // 点击区域或散点，展开table信息
  const allData = [...dotData, ...areaData];

  const series = [
    {
      // 白色航线特效图
      type: 'lines',
      zlevel: 1, // 用于分层，z-index的效果
      effect: {
        show: true, // 动效是否显示
        period: 6, // 特效动画时间
        trailLength: 0.7, // 特效尾迹的长度，数值越大尾迹越长
        color: '#fff', // 特效颜色
        symbolSize: 3, // 特效大小
      },
      lineStyle: {
        normal: {
          // 正常情况下的线条样式
          color: COLOR[0],
          width: 0, // 因为是叠加效果，要是有宽度，线条会变粗，白色航线特效不明显
          curveness: -0.2, // 线条曲度
        },
      },
      data: convertData(OMData), // 特效的起始、终点位置，一个二维数组，相当于coords
    },
    {
      // 小飞机航线效果
      type: 'lines',
      zlevel: 2, // 用于分层，z-index的效果
      symbolSize: 10, // 小飞机航线大小
      effect: {
        show: true, // 动效是否显示
        period: 6, // 特效动画时间
        trailLength: 0, // 特效尾迹的长度
        symbol: planePath, // 特效形状，可以用其他svg pathData路径代替
        symbolSize: 15, // 特效大小
      },
      colorBy: 'data',
      lineStyle: {
        normal: {
          color: COLOR[0],
          width: 1,
          opacity: 0.6,
          curveness: -0.2, // 线条曲度
        },
      },
      // 选中高亮
      selectedMode: 'multiple',
      select: {
        lineStyle: {
          width: 4,
          color: COLOR[2],
        },
        effect: {
          symbolSize: 30,
        },
      },
      animationEasing: 'elasticOut',
      animationEasingUpdate: 'elasticOut',
      animationDelay(idx: any) {
        return idx * 100;
      },
      animationDelayUpdate(idx: any) {
        return idx * 100;
      },
      data: convertData(OMData), // 特效的起始、终点位置，一个二维数组，相当于coords
    },
    {
      // 散点效果-终点
      type: 'effectScatter',
      coordinateSystem: 'geo', // 使用的坐标系为地理坐标系
      zlevel: 3, // 用于分层，z-index的效果
      rippleEffect: {
        brushType: 'stroke', // 波纹绘制效果
      },
      hoverAnimation: true, //鼠标移入放大圆
      label: {
        normal: {
          // 默认的文本标签显示样式
          show: true,
          position: 'left', // 标签显示的位置
          formatter: '{b}', // 标签内容格式器
        },
        // 高亮文本标签显示样式
        emphasis: {
          color: COLOR[2],
          fontSize: 18,
        },
      },
      itemStyle: {
        normal: {
          color: COLOR[0],
        },
        emphasis: {
          color: COLOR[2],
        },
      },
      symbolSize: 10, // 散点的大小
      // 选中高亮
      selectedMode: 'single',
      select: {
        label: {
          color: COLOR[2],
          fontSize: 18,
        },
        itemStyle: {
          color: COLOR[2],
        },
      },
      data: dotData.map((item: any) => ({
        name: item,
        value: geoCoordMap[item], // 终点的坐标
        // symbolSize: item[1].value / 3, // 散点的大小，通过之前设置的权重来计算，val的值来自data返回的value
        label: {
          position: ['广州', '中国'].includes(item) ? 'right' : 'left',
        },
      })),
    },
  ];

  const OPTIONS = {
    backgroundColor: '#101724',
    title: {
      text: '全球看板',
      textStyle: {
        color: '#a5ccf2',
        fontSize: 24,
      },
      subtext: dayjs().format('YYYY-MM-DD'),
      subtextStyle: {
        color: '#fff',
      },
      top: '10px',
      left: 'center',
    },
    series, // 将之前处理的数据放到这里
    textStyle: {
      fontSize: 12,
    },
    geo: {
      map: 'world', // 与引用进来的地图js名字一致
      roam: true, // 缩放平移
      // top: 180,
      // center: [115.97, 29.71], // 视角的中心点
      zoom: 1, // 当前视角的缩放比例
      scaleLimit: {
        //滚轮缩放的极限控制
        min: 0.8, //缩放最小大小
        max: 20, //缩放最大大小
      },
      // 选中高亮
      selectedMode: 'single',
      // 高亮区域样式
      select: {
        label: {
          show: false,
        },
        itemStyle: {
          areaColor: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: '#17436A', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#5FB7FF', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      // 特定区域配置样式
      regions: [
        {
          // 选中的区域
          name: 'China',
          // selected: true,
          select: {
            // 选中区域的样式
            itemStyle: {
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: '#17436A', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#5FB7FF', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            label: {
              show: false,
            },
          },
        },
      ],
      // 区域样式
      itemStyle: {
        normal: {
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: '#071E39', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#17436A', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          borderWidth: 0.5,
          borderColor: '#1B72C1',
          shadowColor: '#4E779C',
          shadowBlur: 8,
        },
      },
      // 高亮区域颜色
      emphasis: {
        label: {
          show: false,
        },
        itemStyle: {
          areaColor: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: '#17436A', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#5FB7FF', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    },
  };

  useEffect(() => {
    // 单击事件
    chartRef.current?.on('click', (e: any) => {
      setCurrentValue(null);
      // 设置表格数据
      if (allData.includes(e.name)) {
        const currentTableData = tableDataMap.find(
          (item) => item.name === e.name
        )?.data;
        if (currentTableData && currentTableData.length > 0) {
          handleClose();
          if (e.componentType === 'series' && e.value) setCurrentValue(e.value);
          setTimeout(() => {
            const ele = document.querySelector(`.${style.table}`);
            ele?.classList.add(style.start);

            const ele2 = document.querySelector(`.${style.rightTable}`);
            ele2?.classList.add(style.start2);

            // ele.style.bottom = ele.style.bottom === '20px' ? '120px' : '20px';
            setVisible(true);
            setTableData(currentTableData);
          }, 300);
        }
      }
      // 设置散点的高亮
      if (dotData.includes(e.name) && e.componentType === 'series') {
        handleHight(e);
        handleZoom(e);
      }
    });

    // 点击空白处，关闭table
    chartRef.current?.getZr().on('click', (e) => {
      // 没有 target 意味着鼠标/指针不在任何一个图形元素上，它是从“空白处”触发的。
      if (!e.target) {
        handleClose();
      }
    });

    // 地图缩放事件监听
    // chartRef.current?.on('georoam', (e) => {
    // });

    // 设置options
    chartRef.current?.setOption(OPTIONS);
  }, []);

  // 点击时，切换中心位置和缩放比例
  useEffect(() => {
    if (visible && currentValue) {
      // 放大且设置中心点
      // const options = chartRef.current?.getOption(); // 获取option
      // options.geo[0].center = currentValue || [];
      // options.geo[0].zoom = options.geo[0].zoom === 3 ? 5 : 3;
      // chartRef.current?.setOption(options);
    }
  }, [tableData]);

  useEffect(() => {
    chartRef.current?.getZr().on('click', (e) => {
      if (!e.target) {
        handleUnAllSelect();
      }
    });
  }, [currentSelectArea]);

  // 关闭动画
  const handleClose = () => {
    const ele = document.querySelector(`.${style.table}`);
    ele?.classList.remove(style.start);
    ele?.classList.add(style.end);

    const ele2 = document.querySelector(`.${style.rightTable}`);
    ele2?.classList.remove(style.start2);
    ele2?.classList.add(style.end2);

    setTimeout(() => {
      setVisible(false);
      ele?.classList.remove(style.end);
      ele2?.classList.remove(style.end2);
    }, 300);
  };

  // 获取改点的所有航线，缩放并居中
  const handleZoom = (e) => {
    // 获取所有散点
    const dotArr = [];
    OMData.forEach((item) => {
      if (item[0].name === e.name || item[1].name === e.name) {
        dotArr.push(item[0].name, item[1].name);
      }
    });

    // 去重
    const newDotArr = [...new Set(dotArr)];
    // 获取坐标
    const coords = [];
    geoData.forEach((item) => {
      if (newDotArr.includes(item.name)) {
        coords.push(item.geo);
      }
    });

    const options = chartRef.current?.getOption(); // 获取option
    let zoom = options.geo[0].zoom;
    // 计算多个坐标的边界矩形
    let maxX = -Infinity;
    let minX = Infinity;
    let maxY = -Infinity;
    let minY = Infinity;
    for (let i = 0; i < coords.length; i++) {
      const coord = coords[i];
      if (coord[0] > maxX) {
        maxX = coord[0];
      }
      if (coord[0] < minX) {
        minX = coord[0];
      }
      if (coord[1] > maxY) {
        maxY = coord[1];
      }
      if (coord[1] < minY) {
        minY = coord[1];
      }
    }

    // 获取区域边界矩形
    const geoComponent = chartRef.current?.getModel().getComponent('geo');
    const boundingRect = geoComponent.coordinateSystem.getBoundingRect();

    // 计算多个坐标的缩放比例和中心点坐标
    const centerCoord = [(maxX + minX) / 2, (maxY + minY) / 2];
    if (boundingRect && boundingRect.width && boundingRect.height) {
      const scaleX = boundingRect.width / Math.abs(maxX - minX); // 缩放比例
      const scaleY = boundingRect.height / Math.abs(maxY - minY); // 缩放比例
      zoom = Math.min(scaleX, scaleY);
    }

    // 设置地图中心点和缩放级别
    options.geo[0].center = centerCoord;
    options.geo[0].zoom = zoom;
    chartRef.current?.setOption(options);
  };

  // 高亮
  const handleHight = (e) => {
    // 取消所有的高亮
    handleUnAllSelect();
    // 地图区域
    const areaArr = geoData.find((item) => item.name === e.name);
    // 航线
    const lineArr = [];
    OMData.forEach((item, idx) => {
      if (item[0].name === e.name || item[1].name === e.name) {
        lineArr.push(idx);
      }
    });
    setCurrentSelectArea(areaArr.area);
    // 散点
    chartRef.current?.dispatchAction({
      type: 'select',
      seriesIndex: 2,
      dataIndex: e.dataIndex,
    });
    // 航线
    chartRef.current?.dispatchAction({
      type: 'select',
      seriesIndex: 1,
      dataIndex: lineArr,
    });
    // 地图区域
    chartRef.current?.dispatchAction({
      type: 'geoSelect',
      geoIndex: 0,
      name: areaArr.area,
    });
  };

  // 取消所有高亮
  const handleUnAllSelect = () => {
    // 取消高亮-散点
    chartRef.current?.dispatchAction({
      type: 'unselect',
      seriesIndex: 2,
      dataIndex: Array.from({ length: dotData.length }, (v, i) => i),
    });
    // 取消高亮-航线
    chartRef.current?.dispatchAction({
      type: 'unselect',
      seriesIndex: 1,
      dataIndex: Array.from({ length: OMData.length }, (v, i) => i),
    });
    // 取消高亮-地图区域
    chartRef.current?.dispatchAction({
      type: 'geoUnSelect',
      geoIndex: 0,
      name: currentSelectArea,
    });
  };

  // 刷新，还原初始化设置
  const handleRefresh = () => {
    const options = { ...OPTIONS };
    options.geo.center = null;
    chartRef.current?.setOption(options);
    handleUnAllSelect();
    handleClose();
  };


  return (
    <section style={{ position: 'relative' }}>
      <div ref={echartsMapRef} style={{ width: '100%', height: '100vh' }} />
      {/* 头部标题 */}
      {/* <div className={style.headerTop} /> */}
      {/* 右下角初始化按钮 */}
      {/* <RedoOutlined /> */}
      {/* // <Icon
      //   name="pc-refresh"
      //   className={style.refresh}
      //   onClick={handleRefresh}
      // /> */}
      <div
        className={classNames(style.table, style.start)}
        style={{ display: visible ? 'block' : 'none' }}
      >
        <div className={style.thead}>
          <div className={classNames(style.td, style.text)}>{'仓库'}</div>
          <div className={classNames(style.td, style.text)}>{'子仓'}</div>
          <div className={classNames(style.td, style.num)}>{'库存'}</div>
          <div className={classNames(style.td, style.num)}>{'入库'}</div>
          <div className={classNames(style.td, style.num)}>{'出库'}</div>
          <div className={classNames(style.td, style.num)}>{'人员'}</div>
        </div>
        {tableData.map((item) => (
          <div className={style.tbody} key={item.id}>
            <div className={classNames(style.td, style.text)}>
              {item.warehouse}
            </div>
            <div className={classNames(style.td, style.text)}>
              {item.targetWarehouse}
            </div>
            <div className={classNames(style.td, style.num)}>
              {item.stockNum}
            </div>
            <div className={classNames(style.td, style.num)}>
              {item.inStorageNum}
            </div>
            <div className={classNames(style.td, style.num)}>
              {item.outboundNum}
            </div>
            <div className={classNames(style.td, style.num)}>
              {item.operationNum}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
