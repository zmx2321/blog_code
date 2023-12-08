export const DropdownList = [{
		title: '多级联动',
		type:'picker',
		value: ['1'],
		componentProps:{
			colNum:3,
			options:[
				{
					label: '属性1',
					value: '1',
					children: [
						{
							label: '属性11',
							value: '11',
							children: [
								{
									label: '属性111',
									value: '111',
									children: [],
								},
								{
									label: '属性112',
									value: '112',
									children: [],
								},
							],
						},
						{
							label: '属性12',
							value: '12',
							children: [
								{
									label: '属性121',
									value: '121',
									children: [],
								},
								{
									label: '属性121',
									value: '122',
									children: [],
								},
							],
						},
						{
							label: '属性13',
							value: '13',
							children: [],
						},
					],
				},
				{
					label: '属性2',
					value: '2',
					children: [],
				},
				{
					label: '属性3',
					value: '3',
					children: [],
				},
				{
					label: '属性4',
					value: '4',
					children: [],
				},
			],
		}
	},
	{
		title: '距离',
		type: 'cell',
		value: 0,
		options: [
			{
				label: "由近到远",
				value: 0
			},
			{
				label: "由远到近",
				value: 1
			},
			{
				label: "由远到近",
				value: 2
			},
			{
				label: "由远到近",
				value: 3
			},
		]
	},
	{
		title: '价格',
		type: 'sort',
		value: 0
	},
	{
		title: '点击按钮',
		type: 'click',
	},
	{
		title: '筛选',
		type: 'filter',
		children: [{
				title: "单选类型1",
				type: 'radio',
				value: null,
				options: [{
						label: "全部",
						value: null
					},
					{
						label: "属性1",
						value: 0
					},
					{
						label: "属性2",
						value: 1
					},
				]
			},
			{
				title: "单选类型2",
				type: 'radio',
				value: null,
				options: [{
						label: "全部",
						value: null
					},
					{
						label: "属性1",
						value: 0
					},
					{
						label: "属性2",
						value: 1
					},
					{
						label: "属性3",
						value: 2
					},
				]
			},
			{
				title: "进度",
				type: 'slider',
				value: 0,
				suffix: '%',
				componentProps:{
					max:100,
				}
			},
			{
				title: "多选类型1",
				type: 'checkbox',
				value: [],
				options: [{
						label: "属性0",
						value: null
					},
					{
						label: "属性1",
						value: 0
					},
					{
						label: "属性2",
						value: 1
					},
					{
						label: "属性3",
						value: 2
					},
					{
						label: "属性4",
						value: 4
					},
					{
						label: "属性5",
						value: 5
					},
				]
			},
		]
	}
]