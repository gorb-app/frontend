import type { GuildMemberResponse, GuildMembersResponse, GuildResponse } from "~/types/interfaces";

interface GlobalStore {
  guilds: Record<string, {
    info: GuildResponse | null;
    members: Record<string, GuildMemberResponse>;
  }>;
}

const store = reactive<GlobalStore>({
  guilds: {}
});

const { fetchGuild, fetchMember } = useApi();

export const useGlobalStore = () => {
  async function getGuildInfo(uuid: string): Promise<GuildResponse | null> {
    const info = store.guilds[uuid]?.info;
    if (info) return info;
    const fetchedInfo = await fetchGuild(uuid);
    
    if (fetchedInfo) {
      store.guilds[uuid]
      ? store.guilds[uuid].info = fetchedInfo
      : store.guilds[uuid] = { info: fetchedInfo, members: {} };

      return fetchedInfo;
    }

    return null;
  }

  async function getGuildMember(guildUuid: string, memberUuid: string): Promise<GuildMemberResponse | null> {
    const member = store.guilds[guildUuid]?.members[memberUuid];
    if (member) return member;

    const fetchedMember = await fetchMember(guildUuid, memberUuid);
    if (fetchedMember) {
      const guild = store.guilds[guildUuid];
      if (!guild) {
        //
      }
      if (guild && guild.members) {
        guild.members[memberUuid] = fetchedMember;
      }
    }

    return null;
  }
}

function ensureValidObject() {}

function ensureValidArray() {}
