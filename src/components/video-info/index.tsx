interface Video {
  videoNo: string;
  url: string;
  videoID: string;
}

interface VideoCategory {
  [category: string]: Video[];
}

export const videos: VideoCategory[] = [
  {
    Discovery: [
      {
        videoNo: "1",
        url: "https://www.youtube.com/watch?v=QQiUVQXEXpo",
        videoID: "QQiUVQXEXpo",
      },
    ],
  },
  {
    Habit: [
      {
        videoNo: "1",
        url: "https://www.youtube.com/watch?v=X64Ld2830qY",
        videoID: "X64Ld2830q",
      },
      {
        videoNo: "2",
        url: "https://www.youtube.com/watch?v=HOPTTlkVUTI",
        videoID: "HOPTTlkVUT",
      },
      {
        videoNo: "3",
        url: "https://www.youtube.com/watch?v=ph733M26lV4",
        videoID: "ph733M26lV4",
      },
    ],
  },
  {
    Blocks: [
      {
        videoNo: "1",
        url: "https://www.youtube.com/watch?v=8ROzxBDqvkY",
        videoID: "8ROzxBDqvkY",
      },
      {
        videoNo: "2",
        url: "https://www.youtube.com/watch?v=NMsoApWLNp8",
        videoID: "NMsoApWLNp8",
      },
      {
        videoNo: "3",
        url: "https://www.youtube.com/watch?v=y1n4HIIWPBA",
        videoID: "y1n4HIIWPBA",
      },
      {
        videoNo: "4",
        url: "https://www.youtube.com/watch?v=XSU-QTmwW4Y",
        videoID: "XSU-QTmwW4Y",
      },
      {
        videoNo: "5",
        url: "https://www.youtube.com/watch?v=l_552z4m1bg",
        videoID: "l_552z4m1b",
      },
      {
        videoNo: "6",
        url: "https://www.youtube.com/watch?v=4Az6B8s5P_I",
        videoID: "4Az6B8s5P_I",
      },
      {
        videoNo: "7",
        url: "https://www.youtube.com/watch?v=HDjjc3CE9FY",
        videoID: "HDjjc3CE9FY",
      },
    ],
  },
  {
    Values: [
      {
        videoNo: "1",
        url: "https://www.youtube.com/watch?v=XZQ3paUbBKI",
        videoID: "XZQ3paUbBKI",
      },
      {
        videoNo: "2",
        url: "https://www.youtube.com/watch?v=986ZvTQM9fY",
        videoID: "986ZvTQM9fY",
      },
      {
        videoNo: "3",
        url: "https://www.youtube.com/watch?v=RobPGWXmgSs",
        videoID: "RobPGWXmgSs",
      },
      {
        videoNo: "4",
        url: "https://www.youtube.com/watch?v=MK0gjzrqMzs",
        videoID: "MK0gjzrqMzs",
      },
      {
        videoNo: "5",
        url: "https://www.youtube.com/watch?v=VO43oxRq1Ow",
        videoID: "VO43oxRq1Ow",
      },
    ],
  },
  {
    Spirituality: [
      {
        videoNo: "1",
        url: "https://www.youtube.com/watch?v=h4FO2LRpinI",
        videoID: "h4FO2LRpinI",
      },
      {
        videoNo: "2",
        url: "https://www.youtube.com/watch?v=qOgT7jQ0OFY",
        videoID: "986ZvTQM9fY",
      },
      {
        videoNo: "3",
        url: "https://www.youtube.com/watch?v=tVtQQbX-oNs",
        videoID: "tVtQQbX-oNs",
      },
      {
        videoNo: "4",
        url: "https://www.youtube.com/watch?v=iM8rKmxfSlY",
        videoID: "iM8rKmxfSlY",
      },
      {
        videoNo: "5",
        url: "https://www.youtube.com/watch?v=dFLhnG3b7_w",
        videoID: "dFLhnG3b7_w",
      },
    ],
  },
  {
    ReviewConclusion: [
      {
        videoNo: "1",
        url: "https://www.youtube.com/watch?v=dXLotseIXZ0",
        videoID: "dXLotseIXZ0",
      },
      {
        videoNo: "2",
        url: "https://www.youtube.com/watch?v=7TSfMwjzAno",
        videoID: "7TSfMwjzAno",
      },
    ],
  },
  {
    Completion: [
      {
        videoNo: "1",
        url: "https://www.youtube.com/watch?v=Hw0C5sRKj2o",
        videoID: "Hw0C5sRKj2o",
      },
    ],
  },
];
