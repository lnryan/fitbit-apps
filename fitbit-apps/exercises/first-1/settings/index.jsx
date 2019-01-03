const colorSet = [
  {color: "black"},
  {color: "darkslategrey"},
  {color: "dimgrey"},
  {color: "grey"},
  {color: "lightgrey"},
  {color: "beige"},
  {color: "white"},
  {color: "maroon"},
  {color: "saddlebrown"},
  {color: "darkgoldenrod"},
  {color: "goldenrod"},
  {color: "rosybrown"},
  {color: "wheat"},
  {color: "navy"},
  {color: "blue"},
  {color: "dodgerblue"},
  {color: "deepskyblue"},
  {color: "aquamarine"},
  {color: "cyan"},
  {color: "olive"},
  {color: "darkgreen"},
  {color: "green"},
  {color: "springgreen"},
  {color: "limegreen"},
  {color: "palegreen"},
  {color: "lime"},
  {color: "greenyellow"},
  {color: "darkslateblue"},
  {color: "slateblue"},
  {color: "purple"},
  {color: "fuchsia"},
  {color: "plum"},
  {color: "orchid"},
  {color: "lavender"},
  {color: "darkkhaki"},
  {color: "khaki"},
  {color: "lemonchiffon"},
  {color: "yellow"},
  {color: "gold"},
  {color: "orangered"},
  {color: "orange"},
  {color: "coral"},
  {color: "lightpink"},
  {color: "palevioletred"},
  {color: "deeppink"},
  {color: "darkred"},
  {color: "crimson"},
  {color: "red"}
];

const boxes = [
    [1,[1,2,3,4]],
    [2,[1,4]],
    [3,[1,4]],
    [4,[1,2,3,4]]
];

let boxOptions = {
  '':[{name:'Select Type First',value:''}],
  'a':[[{name:'Not Available',value:''}]], //special apps like timer, circuits
  'e':[
    {name:'Run',value:'run'},
    {name:'Treadmill',value:'treadmill'},
    {name:'Hiking',value:'hiking'},
    {name:'Weights',value:'weights'},
    {name:'Cycling',value:'cycling'},
    {name:'Elliptical',value:'elliptical'},
    {name:'Spinning',value:'spinning'},
    {name:'Yoga',value:'yoga'},
    {name:'Stair-Climber',value:'stair-climber'},
    {name:'Circuit-Training',value:'circuit-training'},
    {name:'Bootcamp',value:'bootcamp'},
    {name:'Pilates',value:'pilates'},
    {name:'Kickboxing',value:'kickboxing'},
    {name:'Tennis',value:'tennis'},
    {name:'Martial-Arts',value:'martial-arts'},
    {name:'Golf',value:'golf'},
    {name:'Workout',value:'workout'},
    {name:'Swim',value:'swim'},
    {name:'Skiing',value:'skiing'},
    {name:'Skating',value:'skating'},
    {name:'Custom',value:'custom'}
  ],
  's':[
    {name:"Active Minutes",   value:"activeMinutes"},
    {name:"Calories",   value:"calories"},
    {name:"Distance", value:"distance"},
    {name:"Floors", value:"elevationGain"},
    {name:"Steps", value:"steps"},
    {name:"Cardio", value:"cardio"},
    {name:"Heart-Rate", value:"heartrate"}
]};


function mySettings(props) {
  let boxId = (r,c)=> `square_${r}_${c}`

  let boxType = (r,c) => {
    let id = boxId(r,c);
    console.log(`id: ${id}`);
    console.log(props.settings[id+'.type']);
    return props.settings[boxId(r,c)+'.type']?JSON.parse(props.settings[boxId(r,c)+'.type']).values[0]:[{ name:'', value:''}];
  }

  let boxTypeOptions = (r,c)=> boxOptions[boxType(r,c).value];

  return (
    <Page>
      <Section title="App Colors" >
        <ColorSelect
            colors={colorSet}
            settingsKey="outlineColor"
        />
      </Section>
      <Section title="Configure Functional Boxes">
        <Text bold italic>Boxes are configured clock-wise from top-left corner</Text>
        {boxes.map(([row,cols])=> cols.map( col=>
          <Section>
            <Text bold>Row {row}, Column {col}</Text>
            <Text italic></Text>
            <Select
                settingsKey={`${boxId(row,col)}.type`}
                label={`Type`}
                options={[
                    {name:'Stat',value:'s'},
                    {name:'Exercise',value:'e'}
                ]}
                renderItem={
                  option=><Text>{(option)?option.name:'*Select...*'}</Text>
                }
            />

            <Select
                label={`${boxType(row,col).name} selection`}
                //multiple
                settingsKey={`${boxId(row,col)}.fn`}
                options={boxTypeOptions(row,col)}
                renderItem={
                  (option) =>
                      <TextImageRow
                          label={(option)?option.name:'*Select...'}
                          sublabel={boxType(row,col).name}
                          icon="https://tinyurl.com/ybbmpxxq"
                      />
                }
                onSelection={(selection) => console.log(selection)}
            />
        </Section>
        ))}
      </Section>
    </Page>
  );
}
/*            onChange={value=>{
              favoriteColors[value] = favoriteColors.hasOwnProperty(value)?!favoriteColors[value]:true;
              props.settingsStorage.setItem('favoriteColors',favoriteColors);
              console.log(props.settingsStorage.favoriteColors,favoriteColors);
            }}*/
try {
  registerSettingsPage(mySettings);
}catch(e){
  console.error(e);
}