import prisma from '../db';

export const getOrCreateAppSettings = async () => {
  const existing = await prisma.appSetting.findFirst();
  if (existing) return existing;
  return prisma.appSetting.create({
    data: {
      developerMode: false,
    },
  });
};
