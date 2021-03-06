import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    Arwes,
    withStyles,
    createLoader,
    Loading,
    createResponsive,
    utils,
} from 'arwes';
import moment from 'moment';
import {
    GetSkill
} from '../../action/skill';
import { resources } from '../../withTemplate';
import Slider from '../slider/index';

const styles = theme => ({
    root: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      '& $project + $project': {
        marginTop: theme.margin,
      },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    },
    main: {
      flex: 1,
      overflowY: 'auto',
      padding: [theme.padding, 0],
      '& h2': {
        margin: 0,
      },
    },
    project: {
      display: 'block',
    },
    titleRight: {
      float: 'right',
    },
  });
  

class SkillComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shownIndex: 0,
            // Animations enabled by levels.
            animLvl0: false,
            animLvl1: false,
            animLvl2: false,
            animLvl3: false
        };

        this.loader = createLoader();
        this.responsive = createResponsive({
            getTheme: () => props.theme
        });

        props.GetSkill(props.match.params.id);
        this.onLink = this.onLink.bind(this);
    }

    startLoading () {
        const responsive = this.responsive.get();
        const background = utils.getResponsiveResource(resources.background, responsive);
    
        this.loader.load({ images: [background] }, { timeout: 5 * 1000 }).
          then(() => {}, () => {}).
          then(() => this.setState({ shownIndex: true, animLvl0: true }));
    }

    componentDidMount () {
        this.startLoading();
    }

    onLink() {
        this.setState({ animLvl0: false });
    }

    render() {
        const { shownIndex, animLvl0, animLvl1, animLvl2, animLvl3 } = this.state;
        const { classes } = this.props;
        const { background, pattern } = resources;

        const { data, loading } = this.props.SkillReducer.skill;

        if (loading || _.isNull(data)) {
            return (<Arwes><Loading
                full
                animate
                show={!shownIndex}
                animation={{
                    unmountOnExit: true
                }}
                /></Arwes>)
        }

        const { Skill } = data.data;
        const { projects } = data.data.Skill;

        const talk = {
            "slides": [
                {
                    "children": [
                        {
                            "element": "Heading",
                            "children": Skill.title
                        },
                        {
                            "element": "Text",
                            "children": `Level: ${Skill.level}`
                        }
                    ]
                },{
                    "children": [
                        {
                            "element": "Heading",
                            "children": "Project Used In"
                        },
                        {
                            "element": "Table",
                            "children": {
                                "headers": ['title', 'Start Date', 'End Date'],
                                "dataset": _.map(projects, (project) => [project.title, project.start_date ? moment(project.start_date).format('DD MMM YYYY'):'', project.end_date ? moment(project.end_date).format('DD MMM YYYY'): '']),
                            }
                        }
                    ]
                },
            ]
        };

        return (
            <Slider talk={talk}/>
        );
    }
}

const mapStateToProps = (state) => ({
    SkillReducer: state.SkillReducer
});

const mapDispatchToProps = (dispatch) => ({
    GetSkill: (id) => dispatch(GetSkill(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SkillComponent));
