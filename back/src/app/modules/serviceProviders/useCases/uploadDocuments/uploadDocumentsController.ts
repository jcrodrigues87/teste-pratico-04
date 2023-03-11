import { NextFunction, Request, Response } from "express";
import { uploadFilesMiddleware } from "../../../../middlewares/upload";
import fs from "fs";
import { prisma } from "../../../../prisma/prismaClient";

const baseurl = "http://localhost:3000/provider/download";

export class fileHandlerController {
  async upload(req: Request, res: Response, next: NextFunction) {
    const { email } = req.params;
    const pathName = `src/public/${email}`;
    try {
      await uploadFilesMiddleware(req, res);
      await prisma.serviceProvider.update({
        where: {
          email,
        },
        data: {
          filesPath: pathName,
        },
      });
      res.send({ msg: "files updated" });
      next();
    } catch (error) {
      res.send(error);
    }
  }

  async getFiles(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const fileDirectory = `src/public/${email}`;
      fs.readdir(fileDirectory, (err, files) => {
        if (err) {
          res.status(404).send({ msg: "No files in this directory: " + err });
        }

        let filesInfo: any = [];

        files.forEach((file) => {
          filesInfo.push({
            name: file,
            url: `${baseurl}/${email}/${file}`,
          });
        });
        res.send(filesInfo);
      });
    } catch (error) {
      res.send(error);
    }
  }

  async downloadFile(req: Request, res: Response) {
    const { email, fileName } = req.params;
    const fileDirectory = `src/public/${email}/${fileName}`;

    res.download(fileDirectory, fileName, (err) => {
      if (err) {
        res.status(404).send({ msg: "this file doesn't exist" + err });
      }
    });
  }
}
