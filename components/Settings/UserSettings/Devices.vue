<template>
  <div>
    <h1>Devices</h1>
    <div id="devices-container">
      <div class="device-entry" v-for="device in devices">
			  <Icon name="lucide:smartphone" class="device-icon" />
        <div class="device-text">
          <span class="device-title">
            {{ device.device_name }}
          </span>
          <span class="device-subtitle">
            Generated at
            {{ device.created_at_date.toLocaleDateString(undefined) }}
            {{ device.created_at_date.toLocaleTimeString(undefined, {hour12: timeFormat == "12", timeStyle: "short" }) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Device {
  device_name: string
  created_at: number
  created_at_date: Date
}

const devices: Device[] | undefined = await fetchWithApi("/auth/devices")
const timeFormat = getPreferredTimeFormat()

if (devices != undefined) {
  for (let i = 0; i < devices.length; i++) {
    devices[i].created_at_date = new Date(devices[i].created_at * 1000)
  }
}
</script>

<style scoped>
#devices-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.device-entry {
  display: flex;
  align-items: center;
  background-color: var(--chat-highlighted-background-color);
  padding: .25em;
  border-radius: .5em;
}

.device-text {
  display: flex;
  flex-direction: column;
}

.device-icon {
  width: 3em;
  height: 3em;
}

.device-title {
  font-weight: 600;
  font-size: 1em;
}

.device-subtitle {
  font-weight: 100;
  font-size: .8em;
}
</style>