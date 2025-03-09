<script setup lang="ts">
import { toRefs } from 'vue'
import type { Participant } from '@/types'
const props = defineProps<{
  participant: Participant
  id: string
}>()
const { participant } = toRefs(props)
</script>
<template>
  <div class="container">
    <div class="card">
      <h1>Event Records</h1>
      <h2>{{ participant.name }}</h2>
      <p class="email">{{ participant.email }}</p>
      <div
        v-for="(item, index) in participant.events"
        :key="index"
        class="event-card"
      >
        <h3>{{ index + 1 }}. {{ item.title }}</h3>
        <p><strong>Category :</strong> {{ item.category }}</p>
        <p><strong>Time :</strong> {{ item.time }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
}

.email {
  color: #555;
  font-size: 14px;
  margin-bottom: 15px;
}

.event-card {
  background: #f1f3f5;
  margin-top: 10px;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.event-card h3 {
  font-size: 16px;
  margin-bottom: 5px;
}
</style>
