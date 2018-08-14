import React, {Component} from 'react';
import { View, Text } from 'react-native';

export default class BadgeCounter extends Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
			<View style={{borderWidth:1,borderColor:'#fff',borderRadius:50,backgroundColor:'crimson',width:18,height:18,position:'absolute',top:0,right:16,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#fff',fontSize:10,fontWeight:'600'}}>{this.props.counter}</Text>
            </View>
		)
	}
}