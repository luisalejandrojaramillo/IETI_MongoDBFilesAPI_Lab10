import React from 'react';
import OutlinedCard from './Card';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from '@material-ui/core/CardMedia';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Link from '@material-ui/core/Link';

export class Todo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <OutlinedCard
                tareaN = {this.props.text}
                status = {this.props.status}
                date = {this.props.dueDate.toString()}
                responsible = {this.props.responsible}
                image ={this.props.fileUrl} >
            </OutlinedCard>
            <br/>
            </div>
        );
    }
}
