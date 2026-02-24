<script setup lang="ts">
import type { InjurySeverity } from '@/data/injuries';

interface Props {
  severity: InjurySeverity
}

const props = defineProps<Props>()

const SEVERITY_COLORS: Record<InjurySeverity, string> = {
  critical: 'var(--color-mordor-red)',
  serious: 'var(--color-warning)',
  moderate: 'var(--color-info)',
  mild: 'var(--color-success)',
}

const SEVERITY_LABELS: Record<InjurySeverity, string> = {
  critical: '💀 Critical',
  serious: '⚠️ Serious',
  moderate: '🩹 Moderate',
  mild: '✅ Mild',
}
</script>

<template>
  <span
    class="severity-badge"
    :style="{ backgroundColor: SEVERITY_COLORS[props.severity] }"
    :aria-label="`Severity: ${props.severity}`"
  >
    {{ SEVERITY_LABELS[props.severity] }}
  </span>
</template>

<style scoped>
.severity-badge {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  color: white;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.04em;
  white-space: nowrap;
}
</style>
