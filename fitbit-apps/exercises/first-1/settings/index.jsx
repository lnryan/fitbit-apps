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
    ['square_1_1','Box 1','Top Lefthand corner'],
    ['square_1_2','Box 2','Top row, second from left']
];

const opt_stats = [
    {name:'hr',value:'hr'},
    {name:'steps',value:'steps'}
];
const opt_exercises = [
    {name:'run',value:'run'},
    {name:'swim',value:'swim'},
    {name:'custom',value:'custom'}
];

let boxOptions = {
  '':[{name:'Select Type First',value:''}],
  'e':[{name:'Run',value:'run'}],
  's':[
  {name:"Ono",   value:"1"},
  {name:"Two",   value:"2"},
  {name:"Three", value:"3"},
  {name:"Four", value:"4"},
  {name:"Five", value:"5"},
  {name:"Six", value:"6"},
  {name:"Seven", value:"7"},
  {name:"Eight", value:"8"},
  {name:"Nine", value:"9"},
  {name:"Ten", value:"10"},
  {name:"Eleven", value:"11"},
  {name:"Twelve", value:"12"},
  {name:"Thirteen", value:"13"},
  {name:"Fourteen", value:"14"},
  {name:"Fifteen", value:"15"}
]};


function mySettings(props) {
  let retOptions = (box)=>{

    let btype = props.settings[box+'.type'];
    let val = (btype)?JSON.parse(btype).values[0].value:'';
    console.log(`Type is ${btype}, and options key is ${val}`);
    return boxOptions[val];
  }
  return (
    <Page>
      <Section title="App Colors" >
        <ColorSelect
            colors={colorSet}
            settingsKey="outlineColor"
        />
      </Section>
      <Text bold italic>Boxes are configured clock-wise from top-left corner</Text>
      {boxes.map(([id,name,description])=><Section title={name}>
        <Text italic>{description}</Text>
        <Select
            settingsKey={`${id}.type`}
            label={`Type`}
            options={[
                {name:'Stat',value:'s'},
                {name:'Exercise',value:'e'}
            ]}
            renderItem={
              option=><Text>{option.name}</Text>
            }
        />

        <Select
            label={`${name} Function`}
            //multiple
            settingsKey={`${id}.fn`}
            options={retOptions(id)}
            renderItem={
              (option) =>
                  <TextImageRow
                      label={option.name}
                      sublabel="Sub-Label"
                      icon="https://tinyurl.com/ybbmpxxq"
                  />
            }
            onSelection={(selection) => console.log(selection)}
        />
      </Section>)}
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