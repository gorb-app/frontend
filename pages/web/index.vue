<template>
  <div id="client-root">
    <div id="grid-container">
      <div id="left-sidebar-container" class="grid-column right-border">
        <div id="home" class="bottom-border">
          <NuxtLink href="web">
            <img src="~/assets/img/house.svg" alt="Home" width="70%">
          </NuxtLink>
        </div>
        <div id="servers-list" v-for="server of servers">
          <NuxtLink :href="'web' + server.url">
            <img src="~/assets/img/server.svg" :alt="server.name" width="70%">
          </NuxtLink>
        </div>
      </div>
      <div id="main-content" class="grid-column">
        <div id="main-bar" class="main-grid-row">
          main bar
        </div>
        <div id="message-history-container" class="main-grid-row">
          message history
        </div>
        <div id="message-box" class="main-grid-row">
          <input type="text" name="message-box-input" id="message-box-input">
        </div>
      </div>
      <div id="right-sidebar-container" class="grid-column left-border">
        <div id="utilities" class="bottom-border">
          <div>
            <NuxtLink>
              <img src="~/assets/img/envelope.svg" alt="Inbox" width="30dvw">
            </NuxtLink>
          </div>
        </div>
        <div id="members-list">
          <div class="member-item" v-for="member of members">
            <img src="~/assets/img/tiger-head.svg" :alt="member.displayName" width="30dvw">
            <span class="member-display-name">{{ member.displayName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const servers = [
  {
    name: "Test",
    url: "/servers/284103257435"
  },
  {
    name: "Test",
    url: "/servers/284103257435"
  },
  {
    name: "Test",
    url: "/servers/284103257435"
  }
];

const members = [
  {
    id: "3287484395",
    displayName: "SauceyRed"
  },
  {
    id: "3287484395",
    displayName: "SauceyRed"
  },
  {
    id: "3287484395",
    displayName: "SauceyRed"
  },
  {
    id: "3287484395",
    displayName: "SauceyRed"
  },
  {
    id: "3287484395",
    displayName: "SauceyRed"
  },
  {
    id: "3287484395",
    displayName: "SauceyRed"
  },
  {
    id: "3287484395",
    displayName: "SauceyRed"
  },
  {
    id: "3287484395",
    displayName: "SauceyRed"
  },
  {
    id: "3287484395",
    displayName: "SauceyRed"
  }
];

</script>

<style>
#client-root {
  /* border: 1px solid white; */
  height: 100%;
}

#client-root div {
  /* border: 1px solid cyan; */
}

#__nuxt {
  display: flex;
  flex-flow: column;
  height: 100%;
}

#grid-container {
  display: grid;
  grid-template-columns: 1fr 18fr 4fr;
  height: 100%;
}

.grid-column {
  padding-top: 1dvh;
}

#home {
  margin-bottom: 3dvh;
}

#utilities {
  display: flex;
  flex-direction: row;
  margin-bottom: 3dvh;
  justify-content: center;
}

#left-sidebar-container,
#right-sidebar-container {
  text-align: center;
}

.member-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-border {
  border-bottom: 1px solid rgb(70, 70, 70);
}

.left-border {
  border-left: 1px solid rgb(70, 70, 70);
}

.right-border {
  border-right: 1px solid rgb(70, 70, 70);
}

#main-content {
  display: grid;
  grid-template-rows: 1fr 15fr 1fr;
  text-align: center;
}

#message-box {
  border: 1px solid rgb(70, 70, 70);
  width: 100%;
  margin-bottom: 1dvh;
}

#message-box-input {
  width: 80%;
  height: 100%;
}

.main-grid-row {
  border: 1px solid cyan;
}
</style>