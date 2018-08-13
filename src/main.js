import Vue from 'vue';
//Style
import './style.scss';

//Vue resource (http call)
import VueResource from 'vue-resource';
Vue.use(VueResource);

//Global Time Lib
import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', {get() { return this.$root.moment } });

//Global Bus Event
import {checkFilter, setDay} from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {get() { return this.$root.bus}});

//Router
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import routes from './util/routes';
const router = new VueRouter({ routes });

//Vue Plugin Tooltip
import tooltip from './util/tooltip';
Vue.use(tooltip);

//Vue Instance
new Vue({
    //Which element to hook Vue
    el: '#app',
    router,
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus
    },
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        });
        this.$bus.$on('check-filter', checkFilter.bind(this));
        this.$bus.$on('set-day', setDay.bind(this));
    }
});






