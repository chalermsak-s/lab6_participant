<script setup lang="ts">
import type { Participant } from '@/types'
defineProps<{ participant: Participant }>()
</script>

<template>
  <div class="container">
    <RouterLink
      class="event-link"
      :to="{ name: 'participant-detail-view', params: { id: participant.id } }"
    >
      <div class="event-card">
        <h2>{{ participant.name }}</h2>
        <div v-for="(item, index) in participant.events" :key="index">
            <div class="text-left">{{ index + 1 }}. {{ item.title }} | {{ item.category }}</div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.text-left{
  text-align: left;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.event-class {
  display: flex;
  justify-content: center;
  align-items: center;
}
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.event-link {
  text-decoration: none;
  color: inherit;
}
</style>
