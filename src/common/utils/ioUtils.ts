//请求文件系统
// 应用私有资源目录，对应常量plus.io.PRIVATE_WWW，仅应用自身可读
// 应用私有文档目录，对应常量plus.io.PRIVATE_DOC，仅应用自身可读写
// 应用公共文档目录，对应常量plus.io.PUBLIC_DOCUMENTS，多应用时都可读写，常用于保存应用间共享文件
// 应用公共下载目录，对应常量plus.io.PUBLIC_DOWNLOADS，多应用时都可读写，常用于保存下载文件
export const requestFileSystem = function (fileSys = plus.io.PUBLIC_DOWNLOADS): Promise<PlusIoDirectoryReader | undefined> {
	return new Promise((resolve) => {
		plus.io.requestFileSystem(fileSys, (fs) => {
			// /storage/emulated/0/Android/data/top.anydoor.school/downloads/
			resolve(fs.root?.createReader())
		})
	})
}

//获取files目录的reader
export const requestFilesURLReader = function (): Promise<PlusIoDirectoryReader> {
	return new Promise((resolve) => {
		const context = plus.android.runtimeMainActivity()
		let t = plus.android.invoke(context, "getExternalFilesDir", null)
		let p = plus.android.invoke(t, "getAbsolutePath")
		plus.io.resolveLocalFileSystemURL(p, (fs) => {
			resolve(fs.createReader())
		})
	})
}

// filePath是相对于fileSys的 获取文件
export const getFiles = function (filePath: string | String[] = "", reader?: PlusIoDirectoryReader | undefined, fileSys: number | undefined = plus.io.PUBLIC_DOWNLOADS, isFile: boolean = false, entry?: PlusIoDirectoryEntry): Promise<{
	isFile: boolean,
	entries: PlusIoDirectoryEntry[],
	entry?: PlusIoDirectoryEntry
}> {
	let path = filePath
	//将path解析成数组
	if (!(filePath instanceof Array)) {
		path = filePath.split("/")
		for (let i = path.length - 1; i >= 0; i--) {
			if (path[i] == "") {
				path.splice(i, 1)
			}
		}
	}

	return new Promise((resolve, reject) => {
		//获取reader
		if (!reader) {
			requestFileSystem(fileSys).then(async (f: PlusIoDirectoryReader | undefined) => {
				const res = await getFiles(path, f, fileSys)
				resolve(res)
			}).catch(e => {
				reject(e)
			})
		} else {
			// @ts-ignore
			reader.readEntries((entries: PlusIoDirectoryEntry[]) => {
				if (path.length == 0 || isFile) {
					resolve({
						entries,
						isFile,
						entry
					})
				} else {
					for (let i = 0; i < entries.length; i++) {
						if (entries[i].name == path[0]) {
							(path as string[]).splice(0, 1)
							const fReader = entries[i].isFile ? reader : entries[i].createReader()
							return getFiles(path, fReader, fileSys, entries[i].isFile, entries[i]).then(res => {
								resolve(res)
							}).catch(e => {
								reject(e)
							})
						}
					}
					reject("文件或目录不存在")
				}
			})
		}
	})
}

//创建目录，并返回entry
export const getDirectory = async (filePath: string, fileSys = plus.io.PUBLIC_DOCUMENTS, create: boolean = false): Promise<PlusIoDirectoryEntry> => {
	return new Promise((resolve, reject) => {
		plus.io.requestFileSystem(fileSys, (fs) => {
			fs.root?.getDirectory(filePath, { create }, (entry: PlusIoDirectoryEntry) => {
				resolve(entry)
			}, (err) => {
				reject(err)
			})
		})
	})
}

//移动
export const moveTo = async (from: PlusIoDirectoryEntry, to: PlusIoDirectoryEntry, filename: string) => {
	return new Promise((resolve, reject) => {
		from.moveTo(to, filename, (entry: PlusIoDirectoryEntry) => {
			resolve(entry)
		}, (err) => {
			reject(err)
		})
	})
}

//复制
export const copyTo = async (from: PlusIoDirectoryEntry, to: PlusIoDirectoryEntry, filename: string) => {
	return new Promise((resolve, reject) => {
		from.copyTo(to, filename, (entry: PlusIoDirectoryEntry) => {
			resolve(entry)
		}, (err) => {
			reject(err)
		})
	})
}


//获取文件信息
export const getFileInfo = (filePath: string): Promise<{ errMsg: string, size: number, createTime: number }> => {
	return new Promise((resolve, reject) => {
		uni.getSavedFileInfo({
			filePath,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

//通过路径删除文件
export const deleteFileByFullPath = (fullPath: string) => {
	return new Promise((resolve, reject) => {
		uni.removeSavedFile({
			filePath: fullPath,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}