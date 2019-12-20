<template>
  <v-card :class="classes" :height="expandable && !expanded?'':'350px'">
    <v-list-item>
      <v-list-item-icon style="margin-right:10px;">
        <component :is="icon"></component>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="subtitle-2">{{title}}</v-list-item-title>
        <v-list-item-subtitle class="overline">{{overline}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-icon v-if="expandable">
        <v-icon
          @click="function(){
          visible_expandable_infos=!visible_expandable_infos
        }"
        >mdi-chevron-down</v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-card-text>
      <div class="datablock" v-for="(item, i) in infos_object.zero" :key="i">
        <div class="black--text body-2 font-weight-bold">{{item.info}}</div>
        <div class="black--text body-2">{{item.value}}</div>
      </div>
      <v-expand-transition>
        <div v-show="expanded">
          <div class="datablock" v-for="(item, i) in infos_object.others" :key="i">
            <div class="black--text body-2 font-weight-bold">{{item.info}}</div>
            <div class="black--text body-2">{{item.value}}</div>
          </div>
        </div>
      </v-expand-transition>
    </v-card-text>
    <v-card-actions v-if="link">
      <v-btn :to="link.href" text>{{link.name}}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import DocsIcon from "./DocsIcon";
import ResidenceIcon from './ResidenceIcon';
import MyDataIcon from './MyDataIcon';
import ProfessionIcon from './ProfessionIcon';
import BeardManIcon from './BeardManIcon';
import WomanIcon from './WomanIcon';
import DaughterIcon from './DaughterIcon';
import SonIcon from './SonIcon';

export default {
  name: "InfoCard",
  components:{
    DocsIcon,
    ResidenceIcon,
    MyDataIcon,
    ProfessionIcon,
    BeardManIcon,
    WomanIcon,
    DaughterIcon,
    SonIcon
  },
  data() {
    return {
      show: true,
      visible_expandable_infos: false
    };
  },
  computed: {
    isTooltipped() {
      return this.tooltip_icon !== "";
    },
    infos_object() {
      // Divisione delle informazioni per inserimento
      // delle 'others' all'interno dell'area ad espansione
      return this.infos.reduce(
        (infos_object, item, index) => {
          if (index == 0) {
            infos_object.zero.push(item);
          } else {
            infos_object.others.push(item);
          }
          return infos_object;
        },
        { zero: [], others: [] }
      );
    },
    expanded() {
      if (this.expandable) {
        return this.visible_expandable_infos;
      } else {
        return true;
      }
    }
  },
  props: {
    expandable: { type: Boolean, default: false },
    tooltip_icon: { type: String, default: "" },
    classes: String,
    overline: String,
    title: String,
    icon: String,
    infos: {
      type: Array,
      default: () => []
    },
    link: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>