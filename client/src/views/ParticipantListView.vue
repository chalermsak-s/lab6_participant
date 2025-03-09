<script setup lang="ts">
import ParticipantCard from '@/components/ParticipantCard.vue'
import ParticipantService from '@/services/ParticipantService'
import { ref, computed, watchEffect } from 'vue'
import type { Participant } from '@/types'
import { useRouter } from 'vue-router'
import nProgress from 'nprogress'
const router = useRouter()
const participants = ref<Participant[]>([])
const totalParticipants = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalParticipants.value / 3)
  return page.value < totalPages
})

interface Props {
  page: number
}
const props = defineProps<Props>()
const page = computed(() => props.page)

watchEffect(() => {
    ParticipantService
    .getParticipants(page.value, 3)
    .then((response) => {
      nProgress.start()
      participants.value = response.data
      totalParticipants.value = response.headers['x-total-count']
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
    .finally(() => {
      nProgress.done()
    })
})

ParticipantService.getParticipants(page.value, 3).then((response: any) => {
  participants.value = response.data
})
</script>

<template>
  <div>
    <h1>Participants For List</h1>
    <div class="events">
      <ParticipantCard v-for="participant in participants" :key="participant.id" :participant="participant" />
      <div class="pagination">
        <RouterLink
          id="page-prev"
          :to="{ name: 'participant-list-view', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
          >Prev Page</RouterLink
        >
        <RouterLink
          id="page-next"
          :to="{ name: 'participant-list-view', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
          >Next Page</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.events {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
