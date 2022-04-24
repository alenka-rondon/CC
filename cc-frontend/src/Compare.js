import React, {Component} from 'react';

// importing our API endpoint vars
import {variables} from './Variables.js';

export class Compare extends Component{

    constructor(props){
        super(props);

        this.state={
            footprints:[],
            FootprintValueFilter: "",
            FootprintGenderFilter: "",
            FootprintAgeFilter: "",
            FootprintCountryFilter: "",
            footprintsWithoutFilter: []
        }
    }

    filterFn() {
        var FootprintValueFilter = this.state.FootprintValueFilter;
        var FootprintGenderFilter = this.state.FootprintGenderFilter;
        var FootprintAgeFilter = this.state.FootprintAgeFilter;
        var FootprintCountryFilter = this.state.FootprintCountryFilter;

        var filteredData = this.state.footprintsWithoutFilter.filter(
            function(el) {
                return el.FootprintValue.toString().toLowerCase().includes (
                    FootprintValueFilter.toString().trim().toLowerCase()
                ) && 
                el.FootprintGender.toString().toLowerCase().includes (
                    FootprintGenderFilter.toString().trim().toLowerCase()
                ) && 
                el.FootprintAge.toString().toLowerCase().includes (
                    FootprintAgeFilter.toString().trim().toLowerCase()
                ) && 
                el.FootprintCountry.toString().toLowerCase().includes (
                    FootprintCountryFilter.toString().trim().toLowerCase()
                ) 
            }
        );
        this.setState({footprints: filteredData});
    }

    changeFootprintValueFilter = (e) => {
        this.state.FootprintValueFilter = e.target.value;
        this.filterFn();
    }

    changeFootprintGenderFilter = (e) => {
        this.state.FootprintGenderFilter = e.target.value;
        this.filterFn();
    }

    changeFootprintAgeFilter = (e) => {
        this.state.FootprintAgeFilter = e.target.value;
        this.filterFn();
    }
    changeFootprintCountryFilter = (e) => {
        this.state.FootprintCountryFilter = e.target.value;
        this.filterFn();
    }


    //this applies to sorting in ascending vs descending order
    sortResult(prop,asc){
        var sortedData=this.state.footprintsWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({footprints:sortedData});
    }

    refreshList() {
        fetch(variables.API_URL+'footprint')
        .then(response=>response.json())
        .then(data=>{
            this.setState({footprints:data, footprintsWithoutFilter: data});
        });
    }

    componentDidMount() {
        this.refreshList();
    }


    
    render(){

        const {
            footprints

        }=this.state;

        return (
            <table>
                <thead>
                    <tr>
                        <th>
                            <button type="button" onClick={()=>this.sortResult('FootprintValue', true)}> ↑</button>
                            <button type="button" onClick={()=>this.sortResult('FootprintValue', false)}> ↓</button>
                            Footprint Value</th>
                        <th>
                            <button type="button" onClick={()=>this.sortResult('FootprintGender', true)}> ↑</button>
                            <button type="button" onClick={()=>this.sortResult('FootprintGender', false)}> ↓</button>
                            Gender</th>
                        <th>
                            <button type="button" onClick={()=>this.sortResult('FootprintAge', true)}> ↑</button>
                            <button type="button" onClick={()=>this.sortResult('FootprintAge', false)}> ↓</button>
                            Age</th>
                        <th>
                            <button type="button" onClick={()=>this.sortResult('FootprintCountry', true)}> ↑</button>
                            <button type="button" onClick={()=>this.sortResult('FootprintCountry', false)}> ↓</button>
                            Country</th>
                    </tr>
                </thead>
                <tbody>
                    {footprints.map(fp=>
                        <tr key ={fp.FootprintId}>
                            <td>{fp.FootprintValue}</td>
                            <td>{fp.FootprintGender}</td>
                            <td>{fp.FootprintAge}</td>
                            <td>{fp.FootprintCountry}</td>
                        </tr>)}
                        <tr> 
                            <td><input onChange={this.changeFootprintValueFilter} placeholder="Filter by value"/></td>
                            <td><input onChange={this.changeFootprintGenderFilter} placeholder="Filter by gender"/></td>
                            <td><input onChange={this.changeFootprintAgeFilter} placeholder="Filter by age"/></td>
                            <td><input onChange={this.changeFootprintCountryFilter} placeholder="Filter by country"/></td>
                        </tr>
                </tbody>
            </table>
        )
    }
}