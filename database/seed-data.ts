interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pending: Prospd dasdasdas asrewropkvn asawsewqijc ewoieq mdcawqeqwo asd',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'In Progress: Juasd Yuitl impusum providersu trulolile adsad',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'Finished: Asaraum jalcatone uisloitum prodsd qeeutilpsum',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ]
}