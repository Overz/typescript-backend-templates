import multer, { FileFilterCallback, Options } from 'multer';
import { Request, Response, NextFunction } from 'express';
import { extname } from 'path';
import { tmpdir } from 'os';
import crypto from 'crypto';
import bytes from 'bytes';
import { NODE_ENV } from '../utils';
import fs from 'fs/promises';
import { BadRequestError } from '../errors';

export const allowedContentType = ['image/jpeg', 'image/jpg', 'image/png'];
export const allowedExtensions = ['.jpg', '.jpeg', '.png'];

export const multerDiskStorage = () =>
  multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      cb(null, tmpdir());
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      const hash = crypto.randomBytes(16);
      cb(null, `${hash.toString('hex')}-${file.originalname}`);
    },
  });

/**
 * Configuração para rota de Upload de arquivos.
 *
 * Essa configuração, filtra os arquivos, adiciona Hash aos nomes para não serem iguais e darem conflitos,
 * Verifica se os arquivos estão no Formato correto(Mimetypes, Extensão).
 *
 * Para ter acesso aos Mimetypes, os links abaixos existem exemplos:
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 * http://www.iana.org/assignments/media-types/media-types.xhtml
 *
 * Para verificação em Bytes/Hex:
 * https://en.wikipedia.org/wiki/List_of_file_signatures
 */
const config: Options = {
  dest: tmpdir(),
  storage: multer.memoryStorage(),
  limits: {
    fileSize: bytes('5mb'),
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const { mimetype, originalname } = file;

    if (
      allowedContentType.includes(mimetype) &&
      allowedExtensions.includes(extname(originalname))
    ) {
      cb(null, true);
    } else {
      cb(new BadRequestError('Formato de arquivo incorreto!'));
    }
  },
};

export let multerFiles: string[] = [];

/**
 * Middleware para remover o arquivo automaticamente
 * caso aconteça algo ou a requisição termine
 *
 * Remove arquivos de `req.file` ou
 * de um array de paths caso for utilizado
 */
const fileRemover = (req: Request, res: Response, next: NextFunction) => {
  req.on('close', async () => {
    try {
      if (req.file) {
        const { path } = req.file;
        await fs.unlink(path);
      }

      for (const file of multerFiles) {
        await fs.unlink(file);
      }
    } catch (err) {
      NODE_ENV && console.error(err);
    }
  });

  multerFiles = [];
  next();
};

export { config as multerConfig, fileRemover as multerFileRemover };
