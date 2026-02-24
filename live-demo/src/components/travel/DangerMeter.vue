<script setup lang="ts">
import type { DangerLevel } from '@/types/travel'

interface Props {
  level: DangerLevel
}

defineProps<Props>()

const levelConfig: Record<DangerLevel, { color: string; icon: string; value: number }> = {
  Safe: { color: '#4caf50', icon: '🟢', value: 10 },
  'Low Risk': { color: '#8bc34a', icon: '🟡', value: 30 },
  Moderate: { color: '#ff9800', icon: '🟠', value: 55 },
  Dangerous: { color: '#f44336', icon: '🔴', value: 75 },
  Deadly: { color: '#8b0000', icon: '💀', value: 95 },
}
</script>

<template>
  <div class="danger-meter" :aria-label="`Danger level: ${level}`">
    <div class="meter-header">
      <span class="meter-icon">{{ levelConfig[level].icon }}</span>
      <span class="meter-label">{{ level }}</span>
    </div>
    <div class="meter-track" role="progressbar" :aria-valuenow="levelConfig[level].value" aria-valuemin="0" aria-valuemax="100">
      <div
        class="meter-fill"
        :style="{ width: `${levelConfig[level].value}%`, background: levelConfig[level].color }"
      />
    </div>
  </div>
</template>

<style scoped>
.danger-meter {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.meter-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.meter-icon {
  font-size: 1rem;
}

.meter-label {
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  color: var(--color-dark-brown);
}

.meter-track {
  height: 10px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.meter-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width var(--transition-base);
}
</style>
