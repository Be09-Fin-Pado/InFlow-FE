<template>
  <ModalBackground>
    <ModalItem :h="props.h" :w="props.w" fs="2rem" fw="500">
      <FlexItem class="modal-content-container" fld="column" h="100%" w="100%">
        <FlexItem class="modal-close" fld="row" h="4rem" w="100%">
          <XmarkButton
            h="3rem"
            w="3rem"
            fs="3rem"
            bgc="#fff"
            c="#003566"
            @click="closeModal"
          />
        </FlexItem>
        <FlexItem
          class="modal-content"
          fld="column"
          h="calc(100% - 4rem)"
          w="100%"
        >
          <slot></slot>
        </FlexItem>
      </FlexItem>
    </ModalItem>
  </ModalBackground>
</template>

<script setup>
import XmarkButton from '../buttons/XmarkButton.vue';
import ModalBackground from '../modals/ModalBackground.vue';
import ModalItem from '../modals/ModalItem.vue';
import FlexItem from '../semantic/FlexItem.vue';

const props = defineProps({
  h: {
    type: String,
    default: "58rem",
  },
  w: {
    type: String,
    default: "75rem",
  }
})

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal-content-container {
  align-items: center;
  gap: 1rem;
}

.modal-close {
  justify-content: flex-end;
}

.modal-content {
  gap: 0.5rem;
  align-items: center;
  overflow: auto;
}

.modal-label {
  font-size: 2.2rem;
  font-weight: 700;
}
</style>
