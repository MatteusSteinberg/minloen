import { DeleteObjectCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3"

const client = new S3Client({
    endpoint: process.env.SPACES_ENDPOINT as string,
    region: process.env.SPACES_REGION as string,
    credentials: {
        accessKeyId: process.env.SPACES_ACCESS_KEY as string,
        secretAccessKey: process.env.SPACES_SECRET as string,
    },
})

export const deleteFile = async (key: string) => {
    const params = {
        Bucket: process.env.SPACES_BUCKET as string,
        Key: key,
    }

    const command = new DeleteObjectCommand(params)

    try {
        const response = await client.send(command)

        return response as any
    } catch (err) {
        return err.$metadata
    }
}

export const readFile = async (key: string) => {
    const params = {
        Bucket: process.env.SPACES_BUCKET as string,
        Key: key,
    }

    const command = new GetObjectCommand(params)

    try {
        const response = await client.send(command)

        return response.Body as any
    } catch (err) {
        return err.$metadata
    }
}
