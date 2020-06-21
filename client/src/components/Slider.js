import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';


import { connect } from 'react-redux';
import { getBlognewss } from '../actions/blognewsActions';
import propTypes from 'prop-types';


class Slider extends Component {
    state = {
        activeIndex: 0,
        animating: false,
    }
    componentDidMount() {
        this.setState({
            activeIndex: 0,
            animating: false
        });
        this.props.getBlognewss();
    }


    static propTypes = {

        getBlognewss: propTypes.func.isRequired,
    }

    next = () => {
        const { blognews } = this.props
        const { newss } = blognews
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === newss.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous = () => {
        const { blognews } = this.props
        const { newss } = blognews
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? newss.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex = (newIndex) => {
        if (this.state.animating) return;
        this.setState({ activeIndex: newIndex });;
    }


    render() {
        const { activeIndex } = this.state
        const { blognews } = this.props
        const { newss, loading } = blognews
        const slides = newss.map((item) => {
            return (
                <CarouselItem
                    onExiting={() => this.setState({ animating: true })}
                    onExited={() => this.setState({ animating: false })}
                    key={item._id}
                >
                    <a href={`/news/${item.slug}`}><img src={item.img} alt={item.title} width="800" height="400" /></a>
                    <CarouselCaption className="bg-secondary text-white" captionText={item.title} captionHeader={item.title} />
                </CarouselItem>

            );
        });
        if (loading) return <a href={`/news/`}><img src="https://miro.medium.com/max/800/0*i-hP1nkZwhvUkFLz" alt="slider" width="700" height="400" /></a>
        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={newss} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        )
    }
}
const mapStateToProps = (state) => ({
    blognews: state.blognews,
});

export default connect(mapStateToProps, { getBlognewss })(Slider);